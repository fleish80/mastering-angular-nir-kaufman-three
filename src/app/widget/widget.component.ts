import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  ViewRef,
} from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent implements OnInit {
  @Input() title: string;
  @Input() switch: Function;
  @Input() edit: Function;

  count: number;
  viewRef: ViewRef;

  constructor() {}

  ngOnInit(): void {
    this.count = 0;
  }

  increase() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
