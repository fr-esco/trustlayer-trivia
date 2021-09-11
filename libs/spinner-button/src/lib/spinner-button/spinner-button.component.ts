import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatMenuItem } from '@angular/material/menu';

/**
 * {@link https://github.com/angular/components/issues/15982 Material Issue}
 */
@Component({
  selector: 'tlt-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerButtonComponent implements AfterViewInit, OnChanges {
  private static sequence = 1;
  private readonly name = 'SpinnerButtonComponent';

  @ViewChild('spinnerRef', { read: ElementRef, static: false }) spinner_el?: ElementRef;
  @ContentChild(MatButton, { read: ElementRef, static: false }) matButton_el?: ElementRef;
  @ContentChild(MatButton, { static: false }) matButton_instance?: MatButton;
  @ContentChild(MatMenuItem, { read: ElementRef, static: false }) matMenuItem_el?: ElementRef;
  @ContentChild(MatMenuItem, { static: false }) matMenuItem_instance?: MatButton;

  // tslint:disable-next-line: increment-decrement
  @Input() id = `spinner-${SpinnerButtonComponent.sequence++}`;
  @Input() active = false;

  private _disabled = false;
  @Input() set disabled(v: boolean) {
    this._disabled = v;
    setTimeout(() => {
      if (this.matButton_instance) {
        this.matButton_instance.disabled = v;
      }
    });
  }

  constructor(
    private readonly r2: Renderer2,
  ) { }

  ngAfterViewInit() {
    if (this.matButton_el && this.spinner_el) {
      this.r2.appendChild(this.matButton_el.nativeElement, this.spinner_el.nativeElement);
    } else if (this.matMenuItem_el && this.spinner_el) {
      this.r2.appendChild(this.matMenuItem_el.nativeElement, this.spinner_el.nativeElement);
    } else {
      console.error(`Missing elements for ${this.name}#${this.id}`);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('active' in changes && this.matButton_instance && !this._disabled) {
      this.matButton_instance.disabled = !!this.active;
    } else if ('active' in changes && this.matMenuItem_instance && !this._disabled) {
      this.matMenuItem_instance.disabled = !!this.active;
    }
  }
}
