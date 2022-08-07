/// <reference types="react" />
export interface Context {
    name: string;
    setName: (val: string) => void;
}
export declare const ContextWrapper: ({ children }: {
    children: any;
}) => JSX.Element;
export declare const useAppContext: () => Context;
//# sourceMappingURL=Context.d.ts.map