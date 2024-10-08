import { tracks, Track } from '../data/tracks';

export interface SearchResult {
  title: string;
  path: string;
  type: 'page' | 'track';
  content?: string;
  id?: number; // Add this line
}



function trackToSearchResult(track: Track): SearchResult {
  return {
    title: track.title,
    path: '/tracks', // Change this to always navigate to the Tracks page
    type: 'track',
    content: `${track.artist} - ${track.author}`,
    id: track.id // Add this line
  };
}

const trackResults: SearchResult[] = tracks.map(trackToSearchResult);

const searchableItems: SearchResult[] = [ ...trackResults];

export function searchPages(term: string): SearchResult[] {
  const lowercaseTerm = term.toLowerCase();
  return searchableItems.filter(item => 
    item.title.toLowerCase().includes(lowercaseTerm) ||
    (item.content && item.content.toLowerCase().includes(lowercaseTerm))
  );
}

