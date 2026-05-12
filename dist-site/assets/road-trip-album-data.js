import { roadTripAlbumImageManifest } from "./road-trip-album-manifest.js";

const roadTripChapterDefinitions = [
  {
    id: "chapter-1",
    label: "Chapter 1",
    title: "Wind at My Back",
    dateRange: "April 2 to April 29, 2024",
    route: "Massachusetts / Niagara Falls / Sleeping Bear Dunes",
    summary: "The launch chapter: pre-trip nerves, the packed car, Niagara at night, and the first real western push.",
  },
  {
    id: "chapter-2",
    label: "Chapter 2",
    title: "Road Trip Sampler: The proving grounds",
    dateRange: "April 30 to May 4, 2024",
    route: "Pictured Rocks / Devil's Lake / Badlands / Wind Cave / Bighorn",
    summary: "The systems start to click as the landscapes get stranger, the sleep spots get weirder, and the first properly wild days show up.",
  },
  {
    id: "chapter-3",
    label: "Chapter 3",
    title: "West: Cowboy Country",
    dateRange: "May 5 to May 11, 2024",
    route: "Cody / Yellowstone / Big Sky / northbound Montana",
    summary: "Yellowstone opens up, new people enter the trip, and the West starts feeling less like fantasy and more like actual terrain.",
  },
  {
    id: "chapter-4",
    label: "Chapter 4",
    title: "The World Is Big",
    dateRange: "May 12 to May 17, 2024",
    route: "Glacier / Kootenai / Priest Lake / North Cascades / Seattle",
    summary: "Glacier scale, northern lights, ancient cedars, and the long run west toward the coast all stack up in a hurry.",
  },
  {
    id: "chapter-5",
    label: "Chapter 5",
    title: "Lifetimes in Minutes",
    dateRange: "May 18 to May 25, 2024",
    route: "Olympics / Quinault / Pacific coast / Mount St. Helens / Mount Hood",
    summary: "The Pacific edge, rainforest solitude, volcano skiing, and the stretch of road where the trip feels impossibly full.",
  },
  {
    id: "chapter-6",
    label: "Chapter 6",
    title: "Arrival: Max Stone",
    dateRange: "May 26 to May 31, 2024",
    route: "Oregon coast / Redwoods / Mount Shasta / Yosemite / Joshua Tree",
    summary: "The trip stops being solo, the coast gets rowdy, Yosemite lands like a hammer, and the desert starts pressing in.",
  },
  {
    id: "chapter-7",
    label: "Chapter 7",
    title: "On the Road Again",
    dateRange: "June 1 to June 7, 2024",
    route: "Joshua Tree / Sedona / Grand Canyon / Zion / Bryce",
    summary: "Hot miles, pivots, recovery days, and a run of canyon-country decisions that keep turning into bigger adventures.",
  },
  {
    id: "chapter-8",
    label: "Chapter 8",
    title: "Dude Am I on Mars?",
    dateRange: "June 8 to June 11, 2024",
    route: "Capitol Reef / Natural Bridges / Bears Ears / Needles / Moab / Mesa Verde",
    summary: "Remote desert roads, maps on the fly, Moab dirt-bike energy, and the kind of country that barely feels terrestrial.",
  },
  {
    id: "chapter-9",
    label: "Chapter 9",
    title: "Dog Days",
    dateRange: "June 12 to June 15, 2024",
    route: "Chaco / Ghost Ranch / Santa Fe / Texas / eastbound return",
    summary: "The home stretch mixes fatigue, strange beauty, and the long emotional fade from western wonder back toward home.",
  },
];

const roadTripDateGroupDefinitions = [
  {
    id: "chapter-1-greylock-prelude",
    chapterId: "chapter-1",
    dateLabel: "April 2, 2024",
    title: "Greylock prelude",
    location: "Massachusetts / Mount Greylock",
    note: "A cold, early sendoff before the real westward pull starts.",
    prefixes: ["20240402"],
    approximate: true,
  },
  {
    id: "chapter-1-launch-day",
    chapterId: "chapter-1",
    dateLabel: "April 27, 2024",
    title: "Launch day",
    location: "Massachusetts to Niagara Falls",
    note: "Packed-car momentum, roadside stops, and Niagara turning the first night into a real beginning.",
    prefixes: ["20240427"],
  },
  {
    id: "chapter-1-westbound-threshold",
    chapterId: "chapter-1",
    dateLabel: "April 28, 2024",
    title: "Westbound threshold",
    location: "Great Lakes corridor",
    note: "The familiar East fades, the weather stays gray, and the trip starts feeling like it belongs to its own rules.",
    prefixes: ["20240428"],
  },
  {
    id: "chapter-1-sleeping-bear",
    chapterId: "chapter-1",
    dateLabel: "April 29, 2024",
    title: "Sleeping Bear settles in",
    location: "Sleeping Bear Dunes / Michigan",
    note: "Open water, dune light, and the first real sense that sleeping rough can still feel good.",
    prefixes: ["20240429"],
  },
  {
    id: "chapter-2-pictured-rocks-devils-lake",
    chapterId: "chapter-2",
    dateLabel: "April 30, 2024",
    title: "North, then south, then Devil's Lake",
    location: "Pictured Rocks / Marquette / Devil's Lake",
    note: "Moody shoreline, fluorescent road-life logistics, and the ridge walk that turned into a much longer day.",
    prefixes: ["20240430"],
  },
  {
    id: "chapter-2-badlands-arrival",
    chapterId: "chapter-2",
    dateLabel: "May 1, 2024",
    title: "Badlands arrival",
    location: "Badlands National Park",
    note: "The land starts scrambling scale, the rock layers do the talking, and the trip learns its first real national-park lesson.",
    prefixes: ["20240501"],
  },
  {
    id: "chapter-2-wind-cave",
    chapterId: "chapter-2",
    dateLabel: "May 2, 2024",
    title: "Wind Cave goes wild",
    location: "Badlands to Wind Cave National Park",
    note: "Prairie dogs, bison, long loops, and the first day that feels unmistakably like adventure instead of warm-up mileage.",
    prefixes: ["20240502"],
  },
  {
    id: "chapter-2-black-hills",
    chapterId: "chapter-2",
    dateLabel: "May 3, 2024",
    title: "Black Hills pivots",
    location: "Black Hills / Mount Rushmore / Dahl's Chainsaw Art",
    note: "Snowy weather forces the route change, roadside weirdness wins, and the road keeps making the call.",
    prefixes: ["20240503"],
  },
  {
    id: "chapter-2-bighorn-threshold",
    chapterId: "chapter-2",
    dateLabel: "May 4, 2024",
    title: "Bighorn threshold",
    location: "Bighorn National Forest to Cody",
    note: "High passes, gorges, and the clean feeling of finally crossing into bigger western country.",
    prefixes: ["20240504"],
  },
  {
    id: "chapter-3-east-entrance-window",
    chapterId: "chapter-3",
    dateLabel: "May 5, 2024",
    title: "Buffalo Bill to the east entrance",
    location: "Cody / Yellowstone east entrance",
    note: "Museum day, lucky timing, half-open roads, and that first feeling that Yellowstone had opened at exactly the right moment.",
    baseNames: ["20240505_070716", "20240505_071429"],
  },
  {
    id: "chapter-3-yellowstone-solo",
    chapterId: "chapter-3",
    dateLabel: "May 5, 2024",
    title: "Yellowstone solo orbit",
    location: "Yellowstone National Park",
    note: "Wildlife, thermal stops, old-timer beta, and the slower solo wandering rhythm that made the park feel huge.",
    baseNames: [
      "20240505_100614",
      "20240505_101717",
      "20240505_114913",
      "20240505_115304",
      "20240505_115555",
      "20240505_115721",
      "20240505_115732",
      "20240505_115947",
    ],
  },
  {
    id: "chapter-3-yellowstone-camp",
    chapterId: "chapter-3",
    dateLabel: "May 5, 2024",
    title: "Late light and the last campsite",
    location: "Yellowstone / open campground",
    note: "The day slows down here: more wandering, camp luck, and that first cold Yellowstone night settling in.",
    baseNames: ["20240505_141037", "20240505_152354", "20240505_172529"],
  },
  {
    id: "chapter-3-yellowstone-big-sky",
    chapterId: "chapter-3",
    dateLabel: "May 10, 2024",
    title: "Yellowstone and Big Sky orbit",
    location: "Yellowstone / Gallatin / Big Sky",
    note: "Fishing, hanging out, and moving through Yellowstone and Big Sky before Glacier starts pulling north.",
    prefixes: ["20240510"],
    approximate: true,
  },
  {
    id: "chapter-3-northbound-montana",
    chapterId: "chapter-3",
    dateLabel: "May 11, 2024",
    title: "Northbound Montana",
    location: "Montana toward Glacier",
    note: "Montana starts opening up here, and the next chapter is already waiting over the horizon.",
    prefixes: ["20240511"],
    approximate: true,
  },
  {
    id: "chapter-4-blankenship-bridge",
    chapterId: "chapter-4",
    dateLabel: "May 12, 2024",
    title: "Blankenship Bridge and the first Glacier night",
    location: "West Glacier / Blankenship Bridge",
    note: "Big river light, unexpected community, and the kind of evening that makes Glacier feel larger than any plan.",
    prefixes: ["20240512"],
  },
  {
    id: "chapter-4-east-glacier-bike-window",
    chapterId: "chapter-4",
    dateLabel: "May 13, 2024",
    title: "East Glacier and the bike window",
    location: "East Glacier / Going-to-the-Sun Road",
    note: "Huge valleys, moose-country tension, and the rare magic of a park road that is still closed to cars.",
    prefixes: ["20240513"],
  },
  {
    id: "chapter-4-kootenai-cedars",
    chapterId: "chapter-4",
    dateLabel: "May 15, 2024",
    title: "Kootenai and the ancient cedars",
    location: "Kootenai Falls / old logging roads",
    note: "River stops, massive cedars, and the kind of detour that makes later forests feel smaller by comparison.",
    prefixes: ["20240515"],
  },
  {
    id: "chapter-4-priest-lake-cascades",
    chapterId: "chapter-4",
    dateLabel: "May 16, 2024",
    title: "Priest Lake to Mazama",
    location: "Priest Lake / north Idaho / Cascades push",
    note: "Snow-blocked ambitions, good conversations, and the long drive toward the North Cascades.",
    prefixes: ["20240516"],
  },
  {
    id: "chapter-4-ferry-to-seattle",
    chapterId: "chapter-4",
    dateLabel: "May 17, 2024",
    title: "Cascades, ferry luck, Seattle",
    location: "North Cascades / Deception Pass / Seattle",
    note: "Mountain scenery, last-spot ferry timing, and the more chaotic city-side version of road-trip luck.",
    prefixes: ["20240517"],
  },
  {
    id: "chapter-5-olympic-entry",
    chapterId: "chapter-5",
    dateLabel: "May 18, 2024",
    title: "Olympic entry",
    location: "Olympic Peninsula",
    note: "Wet air, dense woods, and the first real breath of Olympic country.",
    prefixes: ["20240518"],
    approximate: true,
  },
  {
    id: "chapter-5-quinault-to-coast",
    chapterId: "chapter-5",
    dateLabel: "May 20, 2024",
    title: "Quinault to the Pacific edge",
    location: "Quinault rainforest to the Washington coast",
    note: "The rainforest gives way to the coast, and the trip reaches the western edge in a way that feels earned.",
    prefixes: ["20240520"],
  },
  {
    id: "chapter-5-forest-road-solitude",
    chapterId: "chapter-5",
    dateLabel: "May 21, 2024",
    title: "Forest-road solitude",
    location: "Washington coast / national forest camp",
    note: "A quiet night on the coast-side forest roads, with that elk-call kind of silence.",
    prefixes: ["20240521"],
    approximate: true,
  },
  {
    id: "chapter-5-mount-st-helens",
    chapterId: "chapter-5",
    dateLabel: "May 23, 2024",
    title: "Mount St. Helens ski day",
    location: "Mount St. Helens",
    note: "Tree-lined approach, a sudden volcano reveal, and the clean joy of a ski objective that absolutely delivers.",
    prefixes: ["20240523"],
  },
  {
    id: "chapter-5-mount-hood-run",
    chapterId: "chapter-5",
    dateLabel: "May 25, 2024",
    title: "Gorge waterfalls to Mount Hood",
    location: "Columbia Gorge / Mount Hood / Astoria handoff",
    note: "A huge day that folds in waterfalls, ski terrain, hot springs, an airport pickup, and the run to the Oregon coast.",
    prefixes: ["20240525"],
  },
  {
    id: "chapter-6-oregon-coast",
    chapterId: "chapter-6",
    dateLabel: "May 26, 2024",
    title: "Max arrives on the coast",
    location: "Oregon coast",
    note: "The solo stretch breaks here. The coast gets looser and a little louder.",
    prefixes: ["20240526"],
    approximate: true,
  },
  {
    id: "chapter-6-redwoods-shasta",
    chapterId: "chapter-6",
    dateLabel: "May 28, 2024",
    title: "Redwoods to Shasta",
    location: "Northern California / Redwoods / Mount Shasta",
    note: "The coast starts bending inland, and the trip trades salt air for volcanic bulk and Sierra-bound energy.",
    prefixes: ["20240528"],
  },
  {
    id: "chapter-6-yosemite",
    chapterId: "chapter-6",
    dateLabel: "May 29, 2024",
    title: "Yosemite wilderness",
    location: "Yosemite",
    note: "This whole cluster lands inside the Yosemite backpacking detour, which is exactly the kind of lucky mistake the trip kept rewarding.",
    prefixes: ["20240529"],
  },
  {
    id: "chapter-6-joshua-tree",
    chapterId: "chapter-6",
    dateLabel: "May 31, 2024",
    title: "Toward Joshua Tree",
    location: "Southern California desert corridor",
    note: "The pavement gets hotter, the light gets harsher, and the desert is close now.",
    prefixes: ["20240531"],
    approximate: true,
  },
  {
    id: "chapter-7-joshua-tree-vegas",
    chapterId: "chapter-7",
    dateLabel: "June 1, 2024",
    title: "Joshua Tree and the flat tire detour",
    location: "Joshua Tree to Las Vegas",
    note: "Dust, heat, 4x4 confidence, and the mechanical reminder that the car is part of the story too.",
    prefixes: ["20240601"],
  },
  {
    id: "chapter-7-sedona",
    chapterId: "chapter-7",
    dateLabel: "June 4, 2024",
    title: "Sedona white line",
    location: "Sedona / Beaver Creek / Sunset Crater area",
    note: "A hard, hot solo day that swings from sketchy riding into recovery and a calmer volcanic evening.",
    prefixes: ["20240604"],
  },
  {
    id: "chapter-7-grand-canyon-zion",
    chapterId: "chapter-7",
    dateLabel: "June 5, 2024",
    title: "Grand Canyon pivot to Zion",
    location: "Grand Canyon to Zion",
    note: "The hike plan cools down, the route changes, and the canyon-country section starts improvising in a good way.",
    prefixes: ["20240605"],
  },
  {
    id: "chapter-7-the-narrows",
    chapterId: "chapter-7",
    dateLabel: "June 6, 2024",
    title: "The Narrows and the Dixie camp",
    location: "Zion / Dixie National Forest",
    note: "Cold water, long canyon miles, and the relief of landing in a quiet forest road camp after the effort.",
    prefixes: ["20240606"],
  },
  {
    id: "chapter-7-bryce-john-burr",
    chapterId: "chapter-7",
    dateLabel: "June 7, 2024",
    title: "Bryce and the John Burr turnoff",
    location: "Bryce Canyon / backroads toward John Burr",
    note: "The weather, the dirt roads, and one small turnoff that quietly sets up the Mars chapter.",
    prefixes: ["20240607"],
  },
  {
    id: "chapter-8-capitol-reef-bears-ears",
    chapterId: "chapter-8",
    dateLabel: "June 8, 2024",
    title: "Capitol Reef to Bears Ears",
    location: "Capitol Reef / Bullfrog / Natural Bridges / Bears Ears",
    note: "A giant day of remote roads, washed-out climbs, odd weather, and one of the trip's biggest desert revelations.",
    prefixes: ["20240608"],
  },
  {
    id: "chapter-8-needles-moab",
    chapterId: "chapter-8",
    dateLabel: "June 9, 2024",
    title: "Needles, Druid Arch, Moab",
    location: "Bears Ears / Needles District / Moab",
    note: "Map-in-hand navigation gives way to one more big spontaneous hike and the first proper reset in town.",
    prefixes: ["20240609"],
  },
  {
    id: "chapter-8-la-sals-dirt-bike",
    chapterId: "chapter-8",
    dateLabel: "June 10, 2024",
    title: "La Sals and the dirt-bike day",
    location: "Moab / La Sal Mountains",
    note: "The album loosens up here: bikes, dust, local hospitality, and one more unforgettable sunset lap.",
    prefixes: ["20240610"],
  },
  {
    id: "chapter-8-mesa-verde-chaco-push",
    chapterId: "chapter-8",
    dateLabel: "June 11, 2024",
    title: "Mesa Verde to the Chaco push",
    location: "Mesa Verde toward Chaco",
    note: "A history-heavy day and a long desert drive that clearly points the trip back toward the eastbound leg.",
    prefixes: ["20240611"],
  },
  {
    id: "chapter-9-chaco-reset",
    chapterId: "chapter-9",
    dateLabel: "June 12, 2024",
    title: "Chaco reset",
    location: "Chaco / northern New Mexico",
    note: "The return is underway, but the landscape is still strange enough to keep pulling me in.",
    prefixes: ["20240612"],
    approximate: true,
  },
  {
    id: "chapter-9-santa-fe-corridor",
    chapterId: "chapter-9",
    dateLabel: "June 13, 2024",
    title: "Ghost Ranch and Santa Fe corridor",
    location: "Ghost Ranch / Santa Fe",
    note: "New Mexico keeps giving even while the long drive home starts creeping into the edges.",
    prefixes: ["20240613"],
    approximate: true,
  },
  {
    id: "chapter-9-eastbound-plain-miles",
    chapterId: "chapter-9",
    dateLabel: "June 14, 2024",
    title: "Eastbound plain miles",
    location: "Texas / Arkansas River / Great Plains return",
    note: "Long straight miles, roadside beauty, and the feeling of the West slowly falling behind.",
    prefixes: ["20240614"],
    approximate: true,
  },
  {
    id: "chapter-9-home-stretch",
    chapterId: "chapter-9",
    dateLabel: "June 15, 2024",
    title: "Home stretch",
    location: "Eastbound return corridor",
    note: "One last push east, tired and still a little unwilling to be done.",
    prefixes: ["20240615"],
    approximate: true,
  },
];

const roadTripAlbumVideoDefinitions = [
  {
    id: "niagara-night",
    groupId: "chapter-1-launch-day",
    video: "assets/media/video/road-trip/niagara-night.mp4",
    poster: "assets/media/video/road-trip/niagara-night-poster.jpg",
    ariaLabel: "Night video of Niagara Falls with colored mist and city lights in the distance.",
  },
  {
    id: "sleeping-bear-shoreline",
    groupId: "chapter-1-sleeping-bear",
    video: "assets/media/video/road-trip/sleeping-bear-shoreline.mp4",
    poster: "assets/media/video/road-trip/sleeping-bear-shoreline-poster.jpg",
    ariaLabel: "Shoreline video at Sleeping Bear Dunes with clear water and a calm horizon.",
  },
  {
    id: "wind-cave-creek",
    groupId: "chapter-2-wind-cave",
    video: "assets/media/video/road-trip/wind-cave-creek.mp4",
    poster: "assets/media/video/road-trip/wind-cave-creek-poster.jpg",
    ariaLabel: "Creek and meadow video from Wind Cave National Park on a bright afternoon.",
  },
  {
    id: "world-is-big-glacier-road-supplemental",
    groupId: "chapter-4-east-glacier-bike-window",
    video: "assets/media/video/road-trip/world-is-big-glacier-road-supplemental.mp4",
    poster: "assets/media/video/road-trip/world-is-big-glacier-road-supplemental-poster.jpg",
    ariaLabel: "Supplemental Glacier clip looking out from a stone arch toward wet pavement and the valley beyond.",
  },
  {
    id: "world-is-big-bike-window-supplemental",
    groupId: "chapter-4-east-glacier-bike-window",
    video: "assets/media/video/road-trip/world-is-big-bike-window-supplemental.mp4",
    poster: "assets/media/video/road-trip/world-is-big-bike-window-supplemental-poster.jpg",
    ariaLabel: "Supplemental Glacier road clip with the river and snow-lined peaks running alongside the pavement.",
  },
  {
    id: "world-is-big-kootenai-water",
    groupId: "chapter-4-kootenai-cedars",
    video: "assets/media/video/road-trip/world-is-big-kootenai-water.mp4",
    poster: "assets/media/video/road-trip/world-is-big-kootenai-water-poster.jpg",
    ariaLabel: "Water rushing through the gorge near Kootenai Falls.",
  },
  {
    id: "world-is-big-cedar-inside",
    groupId: "chapter-4-kootenai-cedars",
    video: "assets/media/video/road-trip/world-is-big-cedar-inside.mp4",
    poster: "assets/media/video/road-trip/world-is-big-cedar-inside-poster.jpg",
    ariaLabel: "Looking upward from inside Ross Creek Ancient Cedars as the trunk and canopy close in overhead.",
  },
  {
    id: "world-is-big-ross-creek-crossing",
    groupId: "chapter-4-kootenai-cedars",
    video: "assets/media/video/road-trip/world-is-big-ross-creek-crossing.mp4",
    poster: "assets/media/video/road-trip/world-is-big-ross-creek-crossing-poster.jpg",
    ariaLabel: "Crossing through Ross Creek Ancient Cedars with wet ground and old growth all around.",
  },
  {
    id: "world-is-big-goat-on-car",
    groupId: "chapter-4-kootenai-cedars",
    video: "assets/media/video/road-trip/world-is-big-goat-on-car.mp4",
    poster: "assets/media/video/road-trip/world-is-big-goat-on-car-poster.jpg",
    ariaLabel: "Mountain goats clustered around the car after Ross Creek, turning the pullout into a weird little scene.",
  },
  {
    id: "world-is-big-priest-lake-mountain-drive",
    groupId: "chapter-4-priest-lake-cascades",
    video: "assets/media/video/road-trip/world-is-big-priest-lake-mountain-drive.mp4",
    poster: "assets/media/video/road-trip/world-is-big-priest-lake-mountain-drive-poster.jpg",
    ariaLabel: "Driving higher above Priest Lake with the road climbing into the mountains.",
  },
  {
    id: "world-is-big-priest-lake-view",
    groupId: "chapter-4-priest-lake-cascades",
    video: "assets/media/video/road-trip/world-is-big-priest-lake-view.mp4",
    poster: "assets/media/video/road-trip/world-is-big-priest-lake-view-poster.jpg",
    ariaLabel: "View out over Priest Lake country with the mountains opening up ahead.",
  },
  {
    id: "world-is-big-cascades-drive",
    groupId: "chapter-4-priest-lake-cascades",
    video: "assets/media/video/road-trip/world-is-big-cascades-drive.mp4",
    poster: "assets/media/video/road-trip/world-is-big-cascades-drive-poster.jpg",
    ariaLabel: "Driving clip through snowy road cuts on the westward push toward the North Cascades.",
  },
  {
    id: "world-is-big-ferry-crossing",
    groupId: "chapter-4-ferry-to-seattle",
    video: "assets/media/video/road-trip/world-is-big-ferry-crossing.mp4",
    poster: "assets/media/video/road-trip/world-is-big-ferry-crossing-poster.jpg",
    ariaLabel: "Suddenly on a ferry, with the crossing turning the road trip into something even stranger and better.",
  },
];

const roadTripAlbumVideosByGroup = roadTripAlbumVideoDefinitions.reduce((map, video) => {
  const existing = map.get(video.groupId) ?? [];
  existing.push(video);
  map.set(video.groupId, existing);
  return map;
}, new Map());

const compareByBaseName = (left, right) => left.baseName.localeCompare(right.baseName);

function buildRoadTripAltText(group, imageIndex) {
  return `Road Trip photo ${imageIndex + 1} from ${group.location} on ${group.dateLabel}.`;
}

function buildRoadTripImages(group) {
  return roadTripAlbumImageManifest
    .filter((image) => {
      if (group.baseNames?.length) {
        return group.baseNames.includes(image.baseName);
      }

      return group.prefixes.some((prefix) => image.baseName.startsWith(prefix));
    })
    .sort(compareByBaseName)
    .map((image, imageIndex) => ({
      ...image,
      alt: buildRoadTripAltText(group, imageIndex),
    }));
}

export const roadTripAlbumSections = roadTripChapterDefinitions.map((chapter, sectionIndex) => {
  const groups = roadTripDateGroupDefinitions
    .filter((group) => group.chapterId === chapter.id)
    .map((group) => {
      const images = buildRoadTripImages(group);
      return {
        ...group,
        images,
        imageCount: images.length,
        videos: roadTripAlbumVideosByGroup.get(group.id) ?? [],
      };
    })
    .filter((group) => group.imageCount > 0);

  const imageCount = groups.reduce((total, group) => total + group.imageCount, 0);

  return {
    ...chapter,
    groups,
    imageCount,
    previousSectionId: roadTripChapterDefinitions[sectionIndex - 1]?.id ?? null,
    previousSectionLabel: roadTripChapterDefinitions[sectionIndex - 1]?.label ?? null,
    nextSectionId: roadTripChapterDefinitions[sectionIndex + 1]?.id ?? null,
    nextSectionLabel: roadTripChapterDefinitions[sectionIndex + 1]?.label ?? null,
  };
});

export const roadTripAlbumChapterLinks = roadTripAlbumSections.map((section) => ({
  id: section.id,
  label: section.label,
  title: section.title,
  imageCount: section.imageCount,
}));

export const roadTripAlbumStats = {
  imageCount: roadTripAlbumSections.reduce((total, section) => total + section.imageCount, 0),
  chapterCount: roadTripAlbumSections.length,
};

export const roadTripAlbumApproximateMappings = roadTripDateGroupDefinitions
  .filter((group) => group.approximate)
  .map((group) => ({
    id: group.id,
    chapterId: group.chapterId,
    dateLabel: group.dateLabel,
    location: group.location,
  }));
