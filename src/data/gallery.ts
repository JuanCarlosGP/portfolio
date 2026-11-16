import type { GalleryItem } from '@portfolio-types/portfolio';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const galleryItems: GalleryItem[] = [
  {
    id: 'hammock',
    type: 'image',
    src: `${BASE}/gallery/chinchilla-hammock.jpg`,
    poster: `${BASE}/gallery/chinchilla-hammock-thumb.jpg`,
    ratio: 'vertical',
    tag: 'PET · CHINCHILLA',
    title: 'Hammock Nap Protocol',
    titleEs: 'Siesta en Hamaca',
    desc: 'Deep sleep state in hanging plush hammock. 0% activity, maximum coziness.',
    descEs: 'Estado de sueño profundo en hamaca acolchada. Cero actividad, máximo confort.',
    meta: '3072×4096 RAW · NIKON / NOTHING'
  },
  {
    id: 'peanuts',
    type: 'video',
    src: `${BASE}/gallery/chinchilla-peanuts.mp4`,
    poster: `${BASE}/gallery/chinchilla-peanuts-poster.jpg`,
    ratio: 'vertical',
    tag: 'PET · SNACK AUDIT',
    title: 'Peanut Sack Inspection',
    titleEs: 'Inspección de Cacahuetes',
    desc: 'Investigating emergency peanut supplies next to the fleece blanket.',
    descEs: 'Inspeccionando el saco de cacahuetes junto a la manta suave.',
    meta: '1080×1920 60FPS · 18s'
  },
  {
    id: 'kayak',
    type: 'video',
    src: `${BASE}/gallery/river-kayak.mp4`,
    poster: `${BASE}/gallery/river-kayak-poster.jpg`,
    ratio: 'vertical',
    tag: 'OUTDOOR · RIVER DESCENT',
    title: 'River Descent',
    titleEs: 'Descenso por el río',
    desc: 'Navigating lush forested riverbanks under overcast skies.',
    descEs: 'Navegando entre orillas frondosas y aguas tranquilas en plena naturaleza.',
    meta: '1080×1920 60FPS · NATURE'
  },
  {
    id: 'ocean',
    type: 'video',
    src: `${BASE}/gallery/ocean-sunset.mp4`,
    poster: `${BASE}/gallery/ocean-sunset-poster.jpg`,
    ratio: 'landscape',
    tag: 'WATER · DUSK REFLECTION',
    title: 'Cruise Landscape',
    titleEs: 'Paisaje crucero',
    desc: 'Sunset gold ripples across deep ocean swells.',
    descEs: 'Ondas doradas reflejadas sobre el agua marina al caer la tarde.',
    meta: '1920×1080 60FPS · MEDITERRANEAN'
  },
  {
    id: 'treat',
    type: 'video',
    src: `${BASE}/gallery/chinchilla-treat.mp4`,
    poster: `${BASE}/gallery/chinchilla-treat-poster.jpg`,
    ratio: 'vertical',
    tag: 'PET · ROUTINE',
    title: 'Pistachio',
    titleEs: 'Pistacho',
    desc: 'High-focus attention triggered by the sound of the treat bag on parquet.',
    descEs: 'Atención total activada por el crujido de la bolsa de snacks en el parqué.',
    meta: '1080×1920 60FPS · 11s'
  },
  {
    id: 'tan',
    type: 'video',
    src: `${BASE}/gallery/summer-sock-tan.mp4`,
    poster: `${BASE}/gallery/summer-sock-tan-poster.jpg`,
    ratio: 'vertical',
    tag: 'SUMMER · OUTDOOR PROOF',
    title: 'Vacation Sunburn',
    titleEs: 'Quemadura en vacaciones',
    desc: 'Definitive visual evidence of hours under the sun after an outdoor day.',
    descEs: 'Evidencia indiscutible de horas bajo el sol tras un día al aire libre.',
    meta: '1080×1920 60FPS · OUTDOORS'
  },
  {
    id: 'lol',
    type: 'video',
    src: `${BASE}/gallery/lol-veigar-mastery.mp4`,
    poster: `${BASE}/gallery/lol-veigar-mastery-poster.jpg`,
    ratio: 'vertical',
    tag: 'GAMING · VEIGAR M98',
    title: 'Side Hustle',
    titleEs: 'Side hustle',
    desc: 'Champion mastery milestones, Emerald II rank, and Honor Level 4.',
    descEs: 'Hito de maestría de campeón (Veigar M98), rango Esmeralda II y Honor 4.',
    meta: '1080×1920 60FPS · LEAGUE OF LEGENDS'
  }
];
