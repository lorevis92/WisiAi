import { InterfacciaChatComponent } from './components/sources/components/interfacciaChat/interfacciaChat.component';

import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { AssistantsComponent } from './components/assistants/assistants/assistants.component';
import { SettingsComponent } from './components/settings/settings/settings.component';
import { OverviewComponent } from './components/overview/overview.component';
import { RouterModule, Route } from '@angular/router';
import { ShareComponent } from './components/share/share.component';
import { DeleteComponent } from './components/delete/delete.component';
import { SourcesComponent } from './components/sources/sources.component';
import { SourcesNavbarComponent } from './components/sources/components/sourcesNavbar/sourcesNavbar.component';
import { TextsourceComponent } from './components/sources/components/textsource/textsource.component';
import { FilesourceComponent } from './components/sources/components/filesource/filesource.component';
import { WebsitesourceComponent } from './components/sources/components/websitesource/websitesource.component';
import { SettingsnavbarComponent } from './components/settings/settingsnavbar/settingsnavbar.component';
import { InterfaceComponent } from './components/settings/settings/interface/interface.component';
import { ModelComponent } from './components/settings/settings/model/model.component';


const routes: Route[] = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'sidebar',
        component: SidebarComponent
    },
    {
        path: 'assistants',
        component: AssistantsComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'overview',
        component: OverviewComponent
    },
    {
        path: 'share',
        component: ShareComponent
    },
    {
        path: 'delete',
        component: DeleteComponent
    },
    {
        path: 'sources',
        component: SourcesComponent
    },
    {
        path: 'textsource',
        component: TextsourceComponent
    },
    {
        path: 'filesource',
        component: FilesourceComponent
    },
    {
        path: 'websitesource',
        component: WebsitesourceComponent
    },
    {
        path: 'interface',
        component: InterfaceComponent
    },
    {
        path: 'model',
        component: ModelComponent
    }
];




@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        SidebarComponent,
        SettingsComponent,
        DashboardComponent,
        AssistantsComponent,
        OverviewComponent,
        ShareComponent,
        DeleteComponent,
        SourcesComponent,
        SourcesNavbarComponent,
        TextsourceComponent,
        FilesourceComponent,
        WebsitesourceComponent,
        InterfacciaChatComponent,
        SettingsnavbarComponent,
        InterfaceComponent,
        ModelComponent,
        RouterModule.forRoot(routes)
        ],
    exports: [RouterModule]
})


export class AppModule { 
   
    }
