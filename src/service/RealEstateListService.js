export const RealEstateListService = {
    getStatusFilterData() {
        return [
            {
                key: "ALL",
                label: "Tümü"
            },
            {
                key: "FOR_RENT",
                label: "Kiralık",
                children: [
                    {
                        key: "FOR_RENT.IN_PREPARATION",
                        label: "Hazırlık Aşamasında",
                    },
                    {
                        key: "FOR_RENT.IN_NOTICE",
                        label: "İlanda",
                    },
                    {
                        key: "FOR_RENT.RENTED",
                        label: "Kiralandı",
                    },
                ],
            },
            {
                key: "FOR_SALE",
                label: "Satılık",
                children: [
                    {
                        key: "FOR_SALE.IN_PREPARATION",
                        label: "Hazırlık Aşamasında",
                    },
                    {
                        key: "FOR_SALE.IN_NOTICE",
                        label: "İlanda",
                    },
                    {
                        key: "FOR_SALE.SALES_CONFIRMATION",
                        label: "Satış Onayında",
                    },
                    {
                        key: "FOR_SALE.PENDING_PAYMENT",
                        label: "Ödeme Bekleniyor",
                    },
                    {
                        key: "FOR_SALE.DEED_TRANSFER",
                        label: "Tapu Devrinde",
                    },
                    {
                        key: "FOR_SALE.SOLD",
                        label: "Satıldı",
                    },
                ],
            },
        ]
    }
}
