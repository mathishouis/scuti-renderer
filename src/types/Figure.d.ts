export interface IFigureData {
  palettes: IFigureDataPalette[];
  setTypes: IFigureDataSetType[];
}

export interface IFigureDataPalette {
  id: number;
  color: IFigureDataColor[];
}

export interface IFigureDataSetType {
  type: string;
  paletteId: number;
  mandatoryF0: boolean; // has been changed to boolean, can be either 1, 0
  mandatoryF1: boolean; // has been changed to boolean, can be either 1, 0
  mandatoryM0: boolean; // has been changed to boolean, can be either 1, 0
  mandatoryM1: boolean; // has been changed to boolean, can be either 1, 0
  sets: IFigureDataSet[];
}

export interface IFigureDataColor {
  id: number;
  index: number;
  club: number; // must be changed to something, either 0, 1, 2
  selectable: boolean; // has been changed to boolean, can be either 1, 0
  hexCode: string;
}

export interface IFigureDataSet {
  id: number;
  gender: 'M' | 'F' | 'U'; // has been changed
  club: number; // must be changed to something, either 0, 1, 2
  colorable: boolean; // has been changed to boolean, can be either 1, 0
  selectable: boolean; // has been changed to boolean, can be either 1, 0
  preselectable: boolean; // has been changed to boolean, can be either 1, 0
  sellable?: boolean; // has been changed to boolean, can be either 1, 0, null
  parts: IFigureDataPart[];
  hiddenLayers: Array<{ partType: string }>; // !! can be empty
}

export interface IFigureDataPart {
  id: number;
  type: string; // must be changed (i guess)
  colorable: boolean; // has been changed to boolean, can be either 1, 0
  index: number;
  colorindex: number;
}
