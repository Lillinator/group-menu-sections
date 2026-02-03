import { apiInitializer } from "discourse/lib/api";
import I18n from "I18n";

export default apiInitializer((api) => {

    const user = api.getCurrentUser();
    const body = document.querySelector('body');

    if (user) {
      user
        .groups
        .map((g) => `group-${g.id}`)
        .forEach((g) => body.classList.add(g));
    }
    
    if (api.getCurrentUser()?.admin) {
      const themeId = themePrefix("foo").match(
        /theme_translations\.(\d+)\.foo/
      )[1];
      const themeURL = getURL(`/admin/customize/themes/${themeId}`);
      addGlobalNotice(
        `<b>Admin notice:</b> you're using the <em>group menu sections</em> theme component. This theme component is deprecated and replaced by the Discourse Group Sidebar Menus component. You should <a href="${themeURL}">remove this theme component</a>, and see <a href="https://meta.discourse.org/t/discourse-group-sidebar-menus/394653" target="_blank">the Discourse Group Sidebar Menus Component page</a> for instructions on how to install and configure it.`,
        "group-menu-sections-deprecation",
        {
          dismissable: true,
          level: "warn",
          dismissDuration: moment.duration("1", "hour"),
        }
      );
    }
  });
