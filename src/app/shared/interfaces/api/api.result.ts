export interface ApiResult {
    route: string;
    status: string;
    code: number;
    title: string;
    message: string;
    boolean: boolean;
    rows: number;
    data: any[];
}
