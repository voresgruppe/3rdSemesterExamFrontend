export interface Hairstyle {
    id: number,
    name: string,
    estimatedTime: number,
    description: string,
    price: number,
    possibleStyles: number[],
    isStarterHairstyle: Boolean,
    pathToImage: string,
}
