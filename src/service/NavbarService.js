export const STAFF_NAVBAR_ELEMENTS = [
    {
        component: "DashboardStaffView",
        title: "Dashboard",
        href: "/administration/dashboard",
        iconClass: "bx bxs-dashboard",
        hasSubMenu: false,
        parentMenuisActive: false,
        submenuIsActive: false,
        submenus: [],
    },
    {
        component: "RealEstateListView",
        title: "Gayrimenkuller",
        href: "/administration/real-estates",
        iconClass: "bx bx-buildings",
        hasSubMenu: false,
        parentMenuisActive: false,
        submenuIsActive: false,
        submenus: [],
    },
    {
        title: "Ödeme İşlemleri",
        href: "",
        iconClass: "bx bxs-bank",
        hasSubMenu: true,
        parentMenuisActive: false,
        submenuIsActive: false,
        submenus: [
            { component: "PaymentDeclarationStaffView", title: "Ödeme Beyanları", href: "/administration/payment-declarations", isActive: false },
        ],
    },
    {
        title: "Raporlar",
        href: "",
        iconClass: "bx bxs-report",
        hasSubMenu: false,
        parentMenuisActive: false,
        submenuIsActive: false,
        submenus: [],
    },
    {
        title: "Onay",
        href: "",
        iconClass: "bx bx-badge-check",
        parentMenuisActive: false,
        hasSubMenu: false,
        submenuIsActive: false,
        submenus: [],
    },
    {
        title: "Sistem Tanımları",
        href: "",
        iconClass: "bx bx-edit-alt",
        hasSubMenu: true,
        parentMenuisActive: false,
        submenuIsActive: false,
        submenus: [
            { component: "CategoryView", title: "Kategoriler", href: "/administration/categories", isActive: false },
            { component: "AdvertPlaceView", title: "İlan Yerleri", href: "/administration/advert-places", isActive: false },
            // { component: "AttributeView", title: "Özellikler", href: "/administration/attributes", isActive: false },
        ],
    },
    {
        title: "Kullanıcı Yönetimi",
        href: "",
        iconClass: "bx bx-edit-alt",
        hasSubMenu: true,
        parentMenuisActive: false,
        submenuIsActive: false,
        submenus: [
            { component: "StaffView", title: "Alt Kullanıcılar", href: "/administration/staffs", isActive: false },
            { component: "TenantView", title: "Kiracılar", href: "/administration/tenants", isActive: false },
        ],
    },
    {
        title: "Güvenlik",
        href: "",
        iconClass: "bx bxs-key",
        hasSubMenu: true,
        parentMenuisActive: false,
        submenuIsActive: false,
        submenus: [
            { component: "RoleView", title: "Roller", href: "/administration/roles", isActive: false },
        ],
    },
]

export const TENANT_NAVBAR_ELEMENTS = [
    {
        component: "RealEstateListView",
        title: "Ödeme Beyanları",
        href: "/tenant/payment-declarations",
        iconClass: "bx bxs-bank",
        hasSubMenu: false,
        parentMenuisActive: false,
        submenuIsActive: false,
        submenus: [],
    },
]