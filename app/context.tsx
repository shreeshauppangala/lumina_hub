import { ReactNode } from 'react';
import { hooks } from './hooks';

const ContextContainer = ({ children }: { children: ReactNode }) => <hooks.ProvideAuth>{children}</hooks.ProvideAuth>

export default ContextContainer;
