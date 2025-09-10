import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { service } from "@ember/service";
import { defaultHomepage } from "discourse/lib/utilities";
import { i18n } from "discourse-i18n";

function isExternal(url, currentUser) {
  if (currentUser?.user_option.external_links_in_new_tab) {
    const link = new URL(url, window.location);
    return link.hostname !== window.location.hostname;
  }
}

export default class GroupMenuSections extends Component {
  @service router;
  @service currentUser;
  @service site;

  @tracked groupmenus = settings.group_menus;

  <template>
      <div class="welcome-link-banner-wrapper">
        <div class="wrap welcome-link-banner">
          <div class="welcome-wrapper">
            <div class="welcome-content">
              <h2>{{htmlSafe (i18n (themePrefix "meta_banner.welcome"))}}</h2>
              <p>{{htmlSafe (i18n (themePrefix "meta_banner.subtitle"))}}</p>
            </div>
            <div class="featured-banner-link">
              {{#each this.bannerLinks as |bl|}}
                <div>
                  <a
                    href={{bl.url}}
                    target={{if (isExternal bl.url this.currentUser) "_blank"}}
                  >
                    <h3>
                      {{icon bl.icon}}
                      {{bl.text}}
                    </h3>
                  </a>
                </div>
              {{/each}}
            </div>
            {{#if settings.can_be_dismissed}}
              <DButton
                class="btn-flat welcome-link-banner-close"
                @icon="xmark"
                @action={{this.dismiss}}
              />
            {{/if}}
          </div>
        </div>
      </div>
  </template>
}
