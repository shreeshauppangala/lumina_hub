import { ReactNode, createContext, useContext } from 'react';
import { useSnackBar } from './snackbar';
import { fileUpload } from './controllers/misc';

interface ProvideMiscI {
  children: ReactNode;
}

interface MiscI {
  onFileUpload: (file: File) => void;
}

const MiscContext = createContext<any>(null);

export const useMisc = (): MiscI => useContext(MiscContext);

const useMiscFunc = () => {
  const { ShowErrorSnackBar } = useSnackBar();

  const onFileUpload = async (formData: {
    file: File;
    folder: 'user' | 'product';
  }) => {
    try {
      const { data } = await fileUpload(formData);

      return data.url;
    } catch (error: any) {
      return ShowErrorSnackBar(error.message);
    }
  };

  return {
    onFileUpload,
  };
};

export const ProvideMisc = ({ children }: ProvideMiscI) => {
  const MiscValue = useMiscFunc();

  return (
    <MiscContext.Provider value={MiscValue}>{children}</MiscContext.Provider>
  );
};
