export type MediaType = 'photo' | 'video'

export interface IInfoBlock {
  idInfoBlock: number
  coordX: number
  coordY: number
  text: string
  idLocation: number
}

export interface IMedia {
  idMedia: number
  coordX: number
  coordY: number
  type: MediaType
  fileSrc: string
  idLocation: number
}

export interface ITransition {
  idTransition: number
  coordX: number
  coordY: number
  idPlacementLocation: number
  idTargetLocation: number
}

export interface ILocation {
  idLocation: number
  name: string
  image: string
  idOrganization: number
  infoBlocks: IInfoBlock[]
  media: IMedia[]
  transitions: ITransition[]
}
