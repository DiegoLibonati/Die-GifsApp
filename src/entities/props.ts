interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
}

export interface AddCategoryProps {
  numberOfGifs: number;
  setNumberOfGifs: (howManyGif: number) => void;
  addCategory: (value: string) => void;
}

export interface GifGridProps {
  category: string;
  numberOfGifs: number;
  handleDeleteCategory: (category: string) => void;
  handleOpenModalImage: (src: string, alt: string) => void;
}

export interface GifItemProps {
  title: string;
  url: string;
  avatar: string;
  avatarName: string;
  avatarDescription: string;
  avatarProfileUrl: string;
  gifDownload: string;
  handleOpenModalImage: (src: string, alt: string) => void;
}

export interface InputFormProps {
  type: string;
  placeholder: string;
  value: string | number;
  className: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface OptionBtnProps {
  description: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
