import type { LngLat } from '@yandex/ymaps3-types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SearchStore {
  draftPointA: LngLat | null
  draftPointB: LngLat | null

  lastInputA: string
  lastInputB: string

  historyPoints: string[]

  setDraftPointA: (point: LngLat) => void
  setDraftPointB: (point: LngLat) => void

  setLastInputA: (val: string) => void
  setLastInputB: (val: string) => void

  setHistoryPoints: (valA: string, valB: string) => void
  selectHistoryRoute: (item: string) => void
  removeHistoryRoute: (id: number) => void
  clearHistory: () => void
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      draftPointA: null,
      draftPointB: null,

      lastInputA: '',
      lastInputB: '',

      historyPoints: [],

      setDraftPointA: point => set({ draftPointA: point }),
      setDraftPointB: point => set({ draftPointB: point }),

      setLastInputA: val => set({ lastInputA: val }),
      setLastInputB: val => set({ lastInputB: val }),

      setHistoryPoints: (valA: string, valB: string) => {
        if (!valA.trim() || !valB.trim()) return

        const combined = `${valA.trim()} - ${valB.trim()}`

        set(state => ({
          historyPoints: [combined, ...state.historyPoints.filter(item => item !== combined)].slice(
            0,
            10,
          ),
        }))
      },

      selectHistoryRoute: item => {
        const [pointA, pointB] = item.split(' - ')

        get().setLastInputA(pointA)
        get().setLastInputB(pointB)
      },

      removeHistoryRoute: (id: number) => {
        set(state => ({
          historyPoints: state.historyPoints.filter((_, i) => i !== id),
        }))
      },

      clearHistory: () => {
        set({
          historyPoints: [],
        })
      },
    }),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: state => ({
        draftPointA: state.draftPointA,
        draftPointB: state.draftPointB,
        lastInputA: state.lastInputA,
        lastInputB: state.lastInputB,
        historyPoints: state.historyPoints,
      }),
    },
  ),
)
