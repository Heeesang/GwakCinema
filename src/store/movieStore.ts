import { create } from 'zustand';
import { MovieType } from '../types/MovieType';

interface MovieState {
  searchTerm: string;
  searchResults: MovieType[];
  setSearchTerm: (term: string) => void;
  setSearchResults: (results: MovieType[]) => void;
  clearSearchResults: () => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  searchTerm: '',
  searchResults: [],
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchResults: (results) => set({ searchResults: results }),
  clearSearchResults: () => set({ searchResults: [], searchTerm: '' }),
}));
