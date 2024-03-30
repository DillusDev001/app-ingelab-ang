export interface ApiResult {
    title: string;
    route: string;
    status: string;
    code: number;
    message: string;
    boolean: boolean;
    rows: number;
    data: any[];
}
