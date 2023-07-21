<template>
  <div class="container">
    <div class="navbar" :class="{ active: navbarIsActive }">
      <div class="top">
        <div class="logo">
          <i class="bx bx-home-smile"></i>
          <span>OpenGYS</span>
        </div>
        <i class="bx bx-menu" @click="toggleNavbar" id="navbarButton"></i>
      </div>
      <div class="navbar-body">
        <div class="navbar-element" v-for="(navbarElement, i) in navbarElements" :key="i">
          <li>
            <a @click="changeActivityStatus(i, null)">
              <i :class="[navbarElement.iconClass, changeActivityOfIcon(navbarElement.parentMenuisActive)]" ></i>
              <span class="navbar-item" :class="{ active: navbarElement.parentMenuisActive }"> {{ navbarElement.title }} </span>
              <i v-if="navbarElement.hasSubMenu" class="bx bxs-chevron-down toogle-sub-menu-icon" @click="toggleSubMenu(i)"></i>
            </a>
            <div class="navbar-tooltip">
              <div v-if="navbarElement.hasSubMenu" class="sub-menu-header">
                {{ navbarElement.title }}
              </div>
              <div v-else>
                <a :href="navbarElement.href">{{ navbarElement.title }}</a>
              </div>
              <div v-for="(submenu, j) in navbarElement.submenus" :key="j">
                <a :href="submenu.href" :class="{ active: submenu.isActive }">{{ submenu.title }}</a>
              </div>
            </div>
          </li>
          <div class="sub-menu" :class="{active: navbarElement.submenuIsActive}" v-if="navbarElement.hasSubMenu">
            <li v-for="(submenu, j) in navbarElement.submenus" :key="j">
              <a @click="changeActivityStatus(i, j)">
                <span class="navbar-item" :class="{ active: submenu.isActive }">{{ submenu.title }}</span>
              </a>
            </li>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content"></div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      navbarIsActive: true,
      navbarElements: [
        {
          title: "Dashboard",
          href: "",
          iconClass: "bx bxs-dashboard",
          hasSubMenu: false,
          parentMenuisActive: true,
          submenuIsActive: false,
          submenus: [],
        },
        {
          title: "Gayrimenkuller",
          href: "",
          iconClass: "bx bx-buildings",
          hasSubMenu: false,
          parentMenuisActive: false,
          submenuIsActive: false,
          submenus: [],
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
          title: "Tanımlar",
          href: "",
          iconClass: "bx bx-edit-alt",
          hasSubMenu: true,
          parentMenuisActive: false,
          submenuIsActive: false,
          submenus: [
            { title: "Kategori", href: "#", isActive: false },
            { title: "İlan Yeri", href: "#", isActive: false },
          ],
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
      ],
    };
  },
  methods: {
    toggleNavbar() {
      this.navbarIsActive = this.navbarIsActive ? false : true;
    },
    changeActivityStatus(parentMenuIndex, submenuIndex) {
      let parentMenu = this.navbarElements.at(parentMenuIndex);

      if (parentMenu.hasSubMenu && submenuIndex == null)
        return;

      this.resetActivityStatus();
      
      parentMenu.parentMenuisActive = true;
      
      if (submenuIndex != null)
        parentMenu.submenus.at(submenuIndex).isActive = true;
    },
    resetActivityStatus() {
      this.navbarElements.forEach((navbarElement) => {
        navbarElement.parentMenuisActive = false;

        navbarElement.submenus.forEach((submenu) => {
          submenu.isActive = false;
        })
      });
    },
    toggleSubMenu(parentMenuIndex) {
      this.navbarElements.at(parentMenuIndex).submenuIsActive = this.navbarElements
        .at(parentMenuIndex).submenuIsActive ? false : true;
    },
    changeActivityOfIcon(parentMenuisActive) {
      return parentMenuisActive ? 'active' : '';
    }
  },
};
</script>

<style>
@import "./assets/css/main.css";
</style>
