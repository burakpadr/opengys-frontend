<template>
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
            <router-link :to="navbarElement.href" @click="changeActivityStatus(i, null)">
              <i :class="[navbarElement.iconClass, changeActivityOfIcon(navbarElement.parentMenuisActive)]" ></i>
              <span class="navbar-item" :class="{ active: navbarElement.parentMenuisActive }"> {{ navbarElement.title }} </span>
              <i v-if="navbarElement.hasSubMenu" class="bx bxs-chevron-down toogle-sub-menu-icon" @click="toggleSubMenu(i)"></i>
            </router-link>
            <div class="navbar-tooltip">
              <div v-if="navbarElement.hasSubMenu" class="sub-menu-header">
                {{ navbarElement.title }}
              </div>
              <div v-else>
                <router-link :to="navbarElement.href" @click="changeActivityStatus(i, null)" >{{ navbarElement.title }}</router-link>
              </div>
              <div v-for="(submenu, j) in navbarElement.submenus" :key="j">
                <router-link :to="submenu.href" @click="changeActivityStatus(i, j)" :class="{ active: submenu.isActive }">{{ submenu.title }}</router-link>
              </div>
            </div>
          </li>
          <div class="sub-menu" :class="{active: navbarElement.submenuIsActive}" v-if="navbarElement.hasSubMenu">
            <li v-for="(submenu, j) in navbarElement.submenus" :key="j">
              <router-link :to="submenu.href" @click="changeActivityStatus(i, j)">
                <span class="navbar-item" :class="{ active: submenu.isActive }">{{ submenu.title }}</span>
              </router-link>
            </li>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "Navbar",
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
            { title: "İlan Yeri", href: "/advert-places", isActive: false },
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

      if (parentMenu.hasSubMenu && submenuIndex == null) return;

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
        });
      });
    },
    toggleSubMenu(parentMenuIndex) {
      this.navbarElements.at(parentMenuIndex).submenuIsActive =
        this.navbarElements.at(parentMenuIndex).submenuIsActive ? false : true;
    },
    changeActivityOfIcon(parentMenuisActive) {
      return parentMenuisActive ? "active" : "";
    },
  },
};
</script>

<style>
.navbar {
  position: relative;
  top: 0;
  left: 0;
  height: 100vh;
  width: 80px;
  background-color: #eff3f8;
  padding: 0.4rem 0.8rem;
  transition: all 0.16s ease;
  float: left;
}

.navbar.active {
  width: 220px;
  overflow-y: auto;
}

.navbar #navbarButton {
  position: absolute;
  color: #000;
  top: 0.4rem;
  left: 48%;
  font-size: 1.5rem;
  line-height: 50px;
  transform: translateX(-50%);
  cursor: pointer;
}

.navbar.active #navbarButton {
  left: 90%;
}

.navbar .navbar-body {
  margin-top: 35px;
}

.navbar .top .logo {
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  pointer-events: none;
  opacity: 0;
  color: #424242;
}

.navbar-tooltip div:not(div.sub-menu-header) {
  font-size: 0.85rem;
  margin-top: 3px;
}

.navbar .top .logo div,
.navbar-tooltip div.sub-menu-header {
  font-size: 1rem;
  margin-top: 3px;
}

.navbar-tooltip div.sub-menu-header {
  font-weight: 500;
  color: #424242;
  border-bottom: 2px solid #424242;
}

.navbar.active .top .logo {
  opacity: 1;
}

.navbar .top .logo i {
  font-size: 2.2rem;
  margin-right: 5px;
}

.navbar .navbar-element li {
  position: relative;
  list-style-type: none;
  height: 50px;
  width: 100%;
  margin: 0.8rem auto;
  line-height: 50px;
}

.navbar .navbar-element li a {
  display: flex;
  text-decoration: none;
  align-items: center;
  border-radius: 5px;
  color: #616161;
  transition: 0.16s ease;
}

.navbar .navbar-element li a:hover {
  background-color: #e2e2e25d;
}

.navbar .navbar-element li a i {
  min-width: 50px;
  text-align: center;
  height: 50px;
  border-radius: 12px;
  line-height: 50px;
}

.navbar .navbar-element .navbar-item {
  opacity: 0;
  transition: 0.16s;
}

.navbar.active .navbar-element .navbar-item {
  opacity: 1;
  transition: 0.16s;
}

.navbar .navbar-element li .navbar-tooltip {
  min-width: 100px;
  position: absolute;
  left: 123%;
  top: 10%;
  border-radius: 5px;
  /* padding: .4rem 0rem; */
  line-height: 1.8rem;
  z-index: 20;
  background-color: #eff3f8;
  color: #616161;
  display: none;
}

.navbar-tooltip div a,
.navbar-tooltip div.sub-menu-header {
  padding: 0rem 1.2rem;
  height: 40px;
}

.navbar .navbar-element li:hover .navbar-tooltip {
  display: block;
}

.navbar.active .navbar-element li .navbar-tooltip {
  display: none;
}

.navbar .navbar-element li .navbar-tooltip div:not(:first-child) {
  margin-top: 10px;
}

.navbar-element .sub-menu {
  width: 70%;
  border-left: 2px solid #616161;
  margin-left: 50px;
  margin-top: 0;
  padding-left: 8px;
  font-size: 0.85em;
  display: none;
}

.navbar-element .sub-menu a {
  padding-left: 10px;
}

.navbar-element .sub-menu li {
  margin-top: 0;
}

.navbar .navbar-element .toogle-sub-menu-icon,
.navbar-element .sub-menu {
  display: none;
  transition: 0.16s;
}

.navbar.active .navbar-element .toogle-sub-menu-icon,
.navbar.active .navbar-element .sub-menu.active {
  display: inline-block;
  transition: 0.16s;
}

.navbar .active {
  color: #3b82f6;
}

.toogle-sub-menu-icon {
    cursor: pointer;
}
</style>