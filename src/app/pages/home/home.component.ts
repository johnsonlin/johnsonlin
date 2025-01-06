import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { fromEvent, switchMap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MaterialModule } from '../../material/material.module';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'jl-home',
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('cube', { static: true }) cube!: ElementRef;
  rotateX = 58;
  rotateY = 0;
  rotateZ = 46;
  mouseStartX = 0;
  mouseStartY = 0;
  controlVisible = false;
  destroyRef = inject(DestroyRef);

  constructor(private platform: Platform, private elm: ElementRef) {}

  ngOnInit() {
    this.cubeTransform();
  }

  rotateUp() {
    this.rotateX += 90;
    this.cube.nativeElement.style.transform = `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg) rotateZ(${this.rotateZ}deg)`;
  }

  rotateDown() {
    this.rotateX -= 90;
    this.cube.nativeElement.style.transform = `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg) rotateZ(${this.rotateZ}deg)`;
  }

  rotateLeft() {
    this.rotateZ += 90;
    this.cube.nativeElement.style.transform = `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg) rotateZ(${this.rotateZ}deg)`;
  }

  rotateRight() {
    this.rotateZ -= 90;
    this.cube.nativeElement.style.transform = `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg) rotateZ(${this.rotateZ}deg)`;
  }

  private cubeTransform() {
    this.cube.nativeElement.style.transform = `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg) rotateZ(${this.rotateZ}deg)`;

    this.bindMouseEvents();

    if (this.platform.ANDROID || this.platform.IOS) {
      this.bindTouchEvents();
    }
  }

  private bindMouseEvents() {
    const mousedown$ = fromEvent<MouseEvent>(
      this.elm.nativeElement,
      'mousedown',
    ).pipe(takeUntilDestroyed(this.destroyRef));
    const mousemove$ = fromEvent<MouseEvent>(
      this.elm.nativeElement,
      'mousemove',
    ).pipe(takeUntilDestroyed(this.destroyRef));
    const mouseup$ = fromEvent<MouseEvent>(
      this.elm.nativeElement,
      'mouseup',
    ).pipe(takeUntilDestroyed(this.destroyRef));
    const mousedrag$ = mousedown$.pipe(
      switchMap(() => mousemove$.pipe(takeUntil(mouseup$))),
      takeUntilDestroyed(this.destroyRef),
    );

    mousedown$.subscribe((e: MouseEvent) => this.moveStart(e.x, e.y));
    mousedrag$.subscribe((e: MouseEvent) => this.rotateCube(e.x, e.y));
    mouseup$.subscribe(this.moveEnd.bind(this));
  }

  private bindTouchEvents() {
    const touchstart$ = fromEvent<TouchEvent>(
      this.elm.nativeElement,
      'touchstart',
    ).pipe(takeUntilDestroyed(this.destroyRef));
    const touchmove$ = fromEvent<TouchEvent>(
      this.elm.nativeElement,
      'touchmove',
    ).pipe(takeUntilDestroyed(this.destroyRef));
    const touchend$ = fromEvent<TouchEvent>(
      this.elm.nativeElement,
      'touchend',
    ).pipe(takeUntilDestroyed(this.destroyRef));

    touchstart$.subscribe((e: TouchEvent) => {
      e.stopPropagation();
      this.moveStart(e.touches[0].clientX, e.touches[0].clientY);
    });
    touchmove$.subscribe((e: TouchEvent) => {
      e.stopPropagation();
      this.rotateCube(e.touches[0].clientX, e.touches[0].clientY);
    });
    touchend$.subscribe(this.moveEnd.bind(this));
  }

  private rotateCube(x: number, y: number) {
    const rotateXOffset = this.mouseStartX - x;
    const rotateYOffset = this.mouseStartY - y;

    this.rotateZ += rotateXOffset / 100;
    this.rotateX += rotateYOffset / 100;
    this.cube.nativeElement.style.transform = `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg) rotateZ(${this.rotateZ}deg)`;
  }

  private moveStart(x: number, y: number) {
    this.mouseStartX = x;
    this.mouseStartY = y;
    this.cube.nativeElement.classList.add('cube--moving');
  }

  private moveEnd() {
    this.cube.nativeElement.classList.remove('cube--moving');
  }
}
