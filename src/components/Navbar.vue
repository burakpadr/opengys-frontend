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
      <div
        class="navbar-element"
        v-for="(navbarElement, i) in navbarElements"
        :key="i"
      >
        <div v-if="isStaff">
          <div
            v-if="
              (navbarElement.hasSubMenu &&
                allowedComponentsContainAnySubMenu(navbarElement.submenus)) ||
              allowedComponentsContainSubMenuByName(navbarElement.component)
            "
          >
            <li>
              <router-link
                :to="navbarElement.href"
                @click="changeActivityStatus(i, null)"
              >
                <i
                  :class="[
                    navbarElement.iconClass,
                    changeActivityOfIcon(navbarElement.parentMenuisActive),
                  ]"
                ></i>
                <span
                  class="navbar-item"
                  :class="{ active: navbarElement.parentMenuisActive }"
                >
                  {{ $t(navbarElement.i18nCode) }}
                </span>
                <i
                  v-if="navbarElement.hasSubMenu"
                  class="bx bxs-chevron-down toogle-sub-menu-icon"
                  @click="toggleSubMenu(i)"
                ></i>
              </router-link>

              <!-- Navbar Tooltip -->

              <div class="navbar-tooltip">
                <div v-if="navbarElement.hasSubMenu" class="sub-menu-header">
                  {{ $t(navbarElement.i18nCode) }}
                </div>
                <div v-else>
                  <router-link
                    :to="navbarElement.href"
                    @click="changeActivityStatus(i, null)"
                    >{{ $t(navbarElement.i18nCode) }}</router-link
                  >
                </div>
                <div v-for="(submenu, j) in navbarElement.submenus" :key="j">
                  <router-link
                    :to="submenu.href"
                    @click="changeActivityStatus(i, j)"
                    :class="{ active: submenu.isActive }"
                    >{{ $t(submenu.i18nCode) }}</router-link
                  >
                </div>
              </div>
            </li>
            <div
              class="sub-menu"
              :class="{ active: navbarElement.submenuIsActive }"
              v-if="navbarElement.hasSubMenu"
            >
              <div v-for="(submenu, j) in navbarElement.submenus" :key="j">
                <li
                  v-if="
                    allowedComponentsContainSubMenuByName(submenu.component)
                  "
                >
                  <router-link
                    :to="submenu.href"
                    @click="changeActivityStatus(i, j)"
                  >
                    <span
                      class="navbar-item"
                      :class="{ active: submenu.isActive }"
                      >{{ $t(submenu.i18nCode) }}</span
                    >
                  </router-link>
                </li>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="isTenant">
          <div>
            <li>
              <router-link
                :to="navbarElement.href"
                @click="changeActivityStatus(i, null)"
              >
                <i
                  :class="[
                    navbarElement.iconClass,
                    changeActivityOfIcon(navbarElement.parentMenuisActive),
                  ]"
                ></i>
                <span
                  class="navbar-item"
                  :class="{ active: navbarElement.parentMenuisActive }"
                >
                  {{ $t(navbarElement.i18nCode) }}
                </span>
                <i
                  v-if="navbarElement.hasSubMenu"
                  class="bx bxs-chevron-down toogle-sub-menu-icon"
                  @click="toggleSubMenu(i)"
                ></i>
              </router-link>

              <!-- Navbar Tooltip -->

              <div class="navbar-tooltip">
                <div v-if="navbarElement.hasSubMenu" class="sub-menu-header">
                  {{ $t(navbarElement.i18nCode) }}
                </div>
                <div v-else>
                  <router-link
                    :to="navbarElement.href"
                    @click="changeActivityStatus(i, null)"
                    >{{ $t(navbarElement.i18nCode) }}</router-link
                  >
                </div>
                <div v-for="(submenu, j) in navbarElement.submenus" :key="j">
                  <router-link
                    :to="submenu.href"
                    @click="changeActivityStatus(i, j)"
                    :class="{ active: submenu.isActive }"
                    >{{ $t(submenu.i18nCode) }}</router-link
                  >
                </div>
              </div>
            </li>
            <div
              class="sub-menu"
              :class="{ active: navbarElement.submenuIsActive }"
              v-if="navbarElement.hasSubMenu"
            >
              <div v-for="(submenu, j) in navbarElement.submenus" :key="j">
                <li>
                  <router-link
                    :to="submenu.href"
                    @click="changeActivityStatus(i, j)"
                  >
                    <span
                      class="navbar-item"
                      :class="{ active: submenu.isActive }"
                      >{{ $t(submenu.i18nCode) }}</span
                    >
                  </router-link>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gysClient } from "@/assets/js/client";
import {
  STAFF_NAVBAR_ELEMENTS,
  TENANT_NAVBAR_ELEMENTS,
} from "@/service/NavbarService";
import { parseToken } from "@/service/TokenService";

export default {
  name: "Navbar",
  data() {
    return {
      navbarIsActive: true,
      navbarElements: TENANT_NAVBAR_ELEMENTS,
      allowedComponentsToBeSeen: [],
      isStaff: null,
      isTenant: null,
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
    getAllowedComponentsToBeSeen() {
      gysClient
        .get("ui-elements/allowed-components-to-be-seen")
        .then((response) => {
          this.allowedComponentsToBeSeen = response.data;
        });
    },
    allowedComponentsContainAnySubMenu(subMenus) {
      for (var i = 0; i < subMenus.length; i++)
        for (var j = 0; j < this.allowedComponentsToBeSeen.length; j++)
          if (
            this.allowedComponentsToBeSeen[j].componentName ===
            subMenus[i].component
          )
            return true;

      return false;
    },
    allowedComponentsContainSubMenuByName(componentName) {
      for (var i = 0; i < this.allowedComponentsToBeSeen.length; i++)
        if (this.allowedComponentsToBeSeen[i].componentName === componentName)
          return true;

      return false;
    },
    setNavbarActivityOnInit() {
      const pathname = window.location.pathname;

      this.navbarElements.forEach((navbarElement) => {
        if (navbarElement.hasSubMenu) {
          navbarElement.submenus.forEach((subMenu) => {
            if (pathname === subMenu.href) {
              subMenu.isActive = true;
              navbarElement.submenuIsActive = true;
              navbarElement.parentMenuisActive = true;

              return;
            }
          });
        } else {
          if (pathname === navbarElement.href) {
            navbarElement.parentMenuisActive = true;

            return;
          }
        }
      });
    },
  },
  mounted() {
    let decodedJwt = parseToken();

    if (decodedJwt.isStaff) {
      this.navbarElements = STAFF_NAVBAR_ELEMENTS;

      this.isStaff = true;
    } else if (decodedJwt.isTenant) {
      this.navbarElements = TENANT_NAVBAR_ELEMENTS;

      this.isTenant = true;
    }

    this.getAllowedComponentsToBeSeen();
    this.setNavbarActivityOnInit();
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
  width: 380px;
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
}

.navbar .navbar-element .sub-menu li {
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
  min-width: 200px;
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