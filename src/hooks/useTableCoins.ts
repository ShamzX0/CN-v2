import useSWR from 'swr'
import getTableCoins from './fetch/getTableCoins'

export default function useTableCoins() {
  return useSWR('getTableCoins', () => getTableCoins(), {
    refreshInterval: 600000,
    revalidateOnFocus: false,
  })
}