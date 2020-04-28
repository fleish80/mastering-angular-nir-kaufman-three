import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ViewContainerRef,
  ComponentFactory,
  OnInit,
  ComponentFactoryResolver,
  Inject,
  Injector,
} from '@angular/core';
import { WidgetComponent } from './widget/widget.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent implements OnInit {
  @ViewChild('leftContainer', { read: ViewContainerRef })
  leftContainer: ViewContainerRef;
  @ViewChild('rightContainer', { read: ViewContainerRef })
  rightContainer: ViewContainerRef;

  private widgetFactory: ComponentFactory<WidgetComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.widgetFactory = this.componentFactoryResolver.resolveComponentFactory<
      WidgetComponent
    >(WidgetComponent);
  }

  createWidget() {
    const widgetComponent = this.widgetFactory.create(this.injector);
    const widgetHostView = this.rightContainer.insert(widgetComponent.hostView);

    widgetComponent.instance.title = 'New Widget';
    widgetComponent.instance.viewRef = widgetHostView;
    widgetComponent.instance.switch = this.switch.bind(this);
  }

  switch(widget: WidgetComponent) {
    const widgetViewRef = widget.viewRef;
    if (this.rightContainer.indexOf(widgetViewRef) >= 0) {
      widget.viewRef = this.leftContainer.insert(
        this.rightContainer.detach(this.rightContainer.indexOf(widgetViewRef))
      );
    }

    if (this.leftContainer.indexOf(widgetViewRef) >= 0) {
      widget.viewRef = this.rightContainer.insert(
        this.leftContainer.detach(this.leftContainer.indexOf(widgetViewRef))
      );
    }
  }
}
