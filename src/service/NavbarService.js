export const STAFF_NAVBAR_ELEMENTS = [
    {
        i18nCode: "navbar.dashboard",
        component: "DashboardStaffView",
        href: "/administration/dashboard",
        iconClass: "bx bxs-dashboard",
        hasSubMenu: false,
        parentMenuisActive: false,
        submenuIsActive: false,
        submenus: [],
    },
    {
        i18nCode: "navbar.realEstates",
        component: "RealEstateListView",
        href: "/administration/real-estates",
        iconClass: "bx bx-buildings",
        hasSubMenu: false,
        parentMenuisActive: false,
        submenuIsActive: false,
        submenus: [],
    },
    {
        i18nCode: "navbar.paymentManagement",
        href: "",
        iconClass: "bx bxs-bank",
        hasSubMenu: true,
        parentMenuisActive: false,
        submenuIsActive: false,
        submenus: [
            { component: "PaymentDeclarationStaffView", i18nCode: "navbar.paymentDeclarations", href: "/administration/payment-declarations", isActive: false },
        ],
    },
    // {
    //     title: "Raporlar",
    //     href: "",
    //     iconClass: "bx bxs-report",
    //     hasSubMenu: false,
    //     parentMenuisActive: false,
    //     submenuIsActive: false,
    //     submenus: [],
    // },
    // {
    //     title: "Onay",
    //     href: "",
    //     iconClass: "bx bx-badge-check",
    //     parentMenuisActive: false,
    //     hasSubMenu: false,
    //     submenuIsActive: false,
    //     submenus: [],
    // },
    {
        i18nCode: "navbar.systemDefinitions",
        href: "",
        iconClass: "bx bx-edit-alt",
        hasSubMenu: true,
        parentMenuisActive: false,
        submenuIsActive: false,
        submenus: [
            { component: "CategoryView", i18nCode: "navbar.categories", href: "/administration/categories", isActive: false },
            { component: "AdvertPlaceView", i18nCode: "navbar.advertPlaces", href: "/administration/advert-places", isActive: false },
            // { component: "AttributeView", title: "Özellikler", href: "/administration/attributes", isActive: false },
        ],
    },
    {
        i18nCode: "navbar.userManagement",
        href: "",
        iconClass: "bx bx-edit-alt",
        hasSubMenu: true,
        parentMenuisActive: false,
        submenuIsActive: false,
        submenus: [
            { component: "StaffView", i18nCode: "navbar.subUsers", href: "/administration/staffs", isActive: false },
            { component: "TenantView", i18nCode: "navbar.tenants", href: "/administration/tenants", isActive: false },
        ],
    },
    {
        i18nCode: "navbar.security",
        href: "",
        iconClass: "bx bxs-key",
        hasSubMenu: true,
        parentMenuisActive: false,
        submenuIsActive: false,
        submenus: [
            { component: "RoleView", i18nCode: "navbar.roles", href: "/administration/roles", isActive: false },
        ],
    },
]

export const TENANT_NAVBAR_ELEMENTS = [
    {
        i18nCode: "navbar.paymentDeclarations",
        component: "RealEstateListView",
        href: "/tenant/payment-declarations",
        iconClass: "bx bxs-bank",
        hasSubMenu: false,
        parentMenuisActive: false,
        submenuIsActive: false,
        submenus: [],
    },
]