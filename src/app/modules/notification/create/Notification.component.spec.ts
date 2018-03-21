import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import swal from 'sweetalert2';
import {CommonService} from '../../common/Common.service';
import {LoginService} from '../../login/Login.service';
import {NotificationComponent} from './Notification.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
