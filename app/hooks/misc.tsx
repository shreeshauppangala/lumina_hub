import { ReactNode, createContext, useContext, useState } from 'react';
import { useSnackBar } from './snackbar';
import { cities, fileUpload, states } from './controllers/misc';

interface ProvideMiscI {
  children: ReactNode;
}

type OptionsI = {
  name: string;
  id: string;
};

interface MiscI {
  isFileUploading: boolean;
  onFileUpload: (formData: {
    file: File;
    folder: 'user' | 'products';
  }) => Promise<string>;

  getStates: (
    usersSearchText: string,
    prevOptions: OptionsI[],
    page: { page: number },
  ) => Promise<OptionsI>;

  getCity: (
    usersSearchText: string,
    prevOptions: OptionsI[],
    page: { page: number },
    state: string,
  ) => Promise<OptionsI>;
}

const MiscContext = createContext<any>(null);

export const useMisc = (): MiscI => useContext(MiscContext);

const useMiscFunc = () => {
  const [isFileUploading, setIsFileUploading] = useState(false);
  const { ShowErrorSnackBar } = useSnackBar();

  const onFileUpload = async (formData: {
    file: File;
    folder: 'user' | 'products';
    // eslint-disable-next-line consistent-return
  }) => {
    try {
      const { data } = await fileUpload(formData);
      return data.url;
    } catch (error: any) {
      ShowErrorSnackBar(error.message);
    } finally {
      setIsFileUploading(false);
    }
  };

  const getStates = async (
    usersSearchText: string,
    prevOptions: OptionsI[],
    page: { page: number },
  ) => {
    const data = await states(page.page, usersSearchText);

    const hasMore = !!data.data.next;
    return {
      options: data.data.map((state: string) => ({
        label: state,
        value: state,
      })),
      hasMore,
      additional: {
        page: page.page + 1,
      },
    };
  };

  const getCity = async (
    usersSearchText: string,
    prevOptions: OptionsI[],
    page: { page: number },
    state: string,
  ) => {
    const data = await cities(state, page.page, usersSearchText);

    const hasMore = !!data.data.next;
    return {
      options: data.data.map((city: string) => ({
        label: city,
        value: city,
      })),
      hasMore,
      additional: {
        page: page.page + 1,
      },
    };
  };

  return {
    isFileUploading,
    onFileUpload,

    getStates,
    getCity,
  };
};

export const ProvideMisc = ({ children }: ProvideMiscI) => {
  const MiscValue = useMiscFunc();

  return (
    <MiscContext.Provider value={MiscValue}>{children}</MiscContext.Provider>
  );
};
