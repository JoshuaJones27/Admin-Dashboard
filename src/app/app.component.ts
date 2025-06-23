import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

/**
 * The root component of the application.
 *
 * Handles the main layout, including the side navigation state and
 * determines if the current route is the login page.
 */
export class AppComponent {
  /**
   * The title of the application.
   */
  title = 'Website';

  /**
   * Indicates whether the side navigation is collapsed.
   */
  isSideNavCollapsed = false;

  /**
   * The current width of the screen.
   */
  screenWidth = 0;

  /**
   * Creates an instance of AppComponent.
   * @param router The Angular Router used to determine the current route.
   */
  constructor(private router: Router) {}

  /**
   * Determines if the current route is the login page.
   * @returns True if the current route is the login page, otherwise false.
   */
  isLoginPage() {
    return this.router.url === '' || this.router.url === '/login';
  }

  /**
   * Handles the side navigation toggle event.
   * Updates the screen width and collapsed state.
   * @param data The side navigation toggle event data.
   */
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
