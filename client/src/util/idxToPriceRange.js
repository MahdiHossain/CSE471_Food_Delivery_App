export const arrPriceRanges = [
    "0-10",
    "11-20",
    "21-30",
    "31-40",
    "41-100"
]

export const priceRangeToIndex = (priceRange) => {
   const index = arrPriceRanges.findIndex(priceRg => priceRg === priceRange)

   return index
}