import { ReactNode, createContext, useContext, useState } from 'react';
import { useSnackBar } from './snackbar';
import { fileUpload } from './controllers/misc';

interface ProvideMiscI {
  children: ReactNode;
}

interface MiscI {
  isFileUploading: boolean;
  onFileUpload: (formData: {
    file: File;
    folder: 'user' | 'product';
  }) => Promise<string>;
}

const MiscContext = createContext<any>(null);

export const useMisc = (): MiscI => useContext(MiscContext);

const useMiscFunc = () => {
  const [isFileUploading, setIsFileUploading] = useState(false);
  const { ShowErrorSnackBar } = useSnackBar();

  const onFileUpload = async (formData: {
    file: File;
    folder: 'user' | 'product';
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

  return {
    isFileUploading,
    onFileUpload,
  };
};

export const ProvideMisc = ({ children }: ProvideMiscI) => {
  const MiscValue = useMiscFunc();

  return (
    <MiscContext.Provider value={MiscValue}>{children}</MiscContext.Provider>
  );
};
