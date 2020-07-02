import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { InitializeService } from '@kognifai/poseidon-ng-initialize-service';
import { Subscription } from 'rxjs';
import { SidebarsVisibilityService } from '@kognifai/poseidon-sidebar-visibilityservice';
import { SettingsMenuService } from '@kognifai/poseidon-ng-settings-menu';
import { Sublocation, NavigationSubitemsService } from '@kognifai/poseidon-ng-navigation-subitems-service';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { HeaderService } from '@kognifai/poseidon-header-component';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from './configuration';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    public initializing: boolean;
    public navigationVisible: boolean;

    private subscription: Subscription;
    private navigationVisibilitySubscription: Subscription;
    private sublocations: Sublocation[] = [];

    constructor(
        private router: Router,
        private initializeService: InitializeService,
        public sidebarsVisibilityService: SidebarsVisibilityService,
        private settingsMenuService: SettingsMenuService,
        private navigationSubitemsService: NavigationSubitemsService,
        private headerService: HeaderService,
        public configurationService: ConfigurationService<Configuration>
    ) {
        this.initializing = true;
        this.navigationVisible = true;
        this.sublocations = [
            new Sublocation('Connectivity Monitoring', 'connectivity-monitoring'),
            new Sublocation('Connectivity Control', 'vessel-configuration'),
            new Sublocation('Operational Plan', 'operational-plan'),
            // new Sublocation('File Manager', '', [], [], '', '', () => {
            //     window.open(
            //         `${this.configurationService.config.filemanagerLink}`,
            //         '_blank' // <- This is what makes it open in a new window.
            //     );
            // })
        ];
    }

    ngOnInit() {
        // PWA:- Checking Network Status
        this.updateNetworkStatusUI();
        window.addEventListener('online', this.updateNetworkStatusUI);
        window.addEventListener('offline', this.updateNetworkStatusUI);

        this.subscription = this.initializeService.initialize().subscribe(
            () => { },
            (error) => { console.log('Initialize error.'); },
            () => {
                // finished
                this.settingsMenuService.ShowAppSettingsItem();
                this.initializing = false;
                this.router.initialNavigation();
                this.navigationSubitemsService.populateSidebar(this.sublocations);
                const config = {
                    title: 'Custom component',
                    action: () => { }
                };

                this.headerService.setContent(CustomHeaderComponent, config);
            }
        );

        this.navigationVisibilitySubscription = this.sidebarsVisibilityService.navigationVisibilityChanged.subscribe((visible: boolean) => {
            this.navigationVisible = visible;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.navigationVisibilitySubscription.unsubscribe();
    }

    // Checking App Status, whether its online or offline
    private updateNetworkStatusUI() {
        if (navigator.onLine) {
            // you might be online
            (document.getElementsByTagName('body') as any).style = '';
        } else {
            // 100% sure, you are offline
            (document.getElementsByTagName('body') as any).style = 'filter: grayscale(1)';
        }
    }
}
