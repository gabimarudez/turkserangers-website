"use client";

import { use, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { Trash2, Upload } from "lucide-react";
import { useAdmin } from "@/admin/store";
import { AdminPageHeader, RequirePermission } from "@/admin/ui";
import type { MediaItem } from "@/admin/types";
import { getDictionary } from "@/i18n";
import { defaultLocale, isLocale } from "@/i18n/config";
import { albums } from "@/data/sponsors";

const MAX_BYTES = 4 * 1024 * 1024;

export default function AdminMediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const { state, user, addMedia, deleteMedia } = useAdmin();
  const inputRef = useRef<HTMLInputElement>(null);
  const [album, setAlbum] = useState(albums[0]?.slug ?? "algemeen");
  const [dragging, setDragging] = useState(false);
  const [warning, setWarning] = useState("");

  if (!user) return null;

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setWarning("");

    const accepted = Array.from(files).filter((file) => {
      if (!file.type.startsWith("image/")) return false;
      if (file.size > MAX_BYTES) {
        setWarning(
          locale === "tr"
            ? "4 MB'tan büyük dosyalar demo için atlandı."
            : locale === "en"
              ? "Files larger than 4 MB were skipped in this demo."
              : "Bestanden groter dan 4 MB zijn in deze demo overgeslagen.",
        );
        return false;
      }
      return true;
    });

    const items: MediaItem[] = await Promise.all(
      accepted.map(
        (file) =>
          new Promise<MediaItem>((resolve) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({
                id: `media-${Date.now()}-${file.name}`,
                name: file.name,
                dataUrl: String(reader.result),
                size: file.size,
                uploadedAt: new Date().toISOString(),
                uploadedBy: user!.name,
                album,
              });
            reader.readAsDataURL(file);
          }),
      ),
    );

    if (items.length > 0) addMedia(items);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    void handleFiles(event.dataTransfer.files);
  }

  const t = {
    drop:
      locale === "tr"
        ? "Fotoğrafları buraya sürükleyin veya seçmek için tıklayın"
        : locale === "en"
          ? "Drag photos here, or click to select"
          : "Sleep foto's hierheen, of klik om te kiezen",
    album: locale === "tr" ? "Albüm" : locale === "en" ? "Album" : "Album",
    empty:
      locale === "tr"
        ? "Henüz yüklenmiş fotoğraf yok."
        : locale === "en"
          ? "No photos uploaded yet."
          : "Nog geen foto's geüpload.",
  };

  return (
    <RequirePermission resource="media" message={dict.admin.noAccess}>
      <AdminPageHeader
        title={dict.admin.media}
        description={`${state.media.length} ${dict.gallery.photos}`}
      />

      <div className="mb-5 max-w-xs">
        <label className="label" htmlFor="album">{t.album}</label>
        <select
          id="album"
          className="field"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        >
          {albums.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.title[locale]}
            </option>
          ))}
        </select>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
          dragging
            ? "border-rangers-red bg-rangers-red/5"
            : "border-rangers-border hover:border-white/30"
        }`}
      >
        <Upload className="h-8 w-8 text-white/30" aria-hidden="true" />
        <p className="text-sm text-white/60">{t.drop}</p>
        <p className="text-xs text-white/30">JPG / PNG / WEBP · max 4 MB</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e: ChangeEvent<HTMLInputElement>) => void handleFiles(e.target.files)}
        />
      </div>

      {warning && <p className="mt-3 text-xs text-amber-400">{warning}</p>}

      <div className="mt-8">
        {state.media.length === 0 ? (
          <p className="card p-6 text-sm text-white/50">{t.empty}</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {state.media.map((item) => (
              <figure key={item.id} className="card group relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.dataUrl}
                  alt={item.name}
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="p-2">
                  <p className="truncate text-[11px] text-white/60">{item.name}</p>
                  <p className="text-[10px] text-white/30">
                    {(item.size / 1024).toFixed(0)} kB · {item.album}
                  </p>
                </figcaption>
                <button
                  type="button"
                  onClick={() => deleteMedia(item.id)}
                  className="absolute right-2 top-2 rounded-md bg-black/70 p-1.5 text-white/70 opacity-0 transition-opacity hover:text-rangers-redSoft group-hover:opacity-100"
                  aria-label={`Verwijder ${item.name}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </figure>
            ))}
          </div>
        )}
      </div>
    </RequirePermission>
  );
}
