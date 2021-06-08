import { AxiosError } from 'axios';
export declare type Callback<T> = (err: AxiosError | null, data?: T) => void;
