export interface Sale {
    id: number,
    client_id: number,
    sale_at: Date,
    iva: number,
    discount: number,
    total: number
}