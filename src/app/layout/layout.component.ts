import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoredUser } from '@shared/models/user.model';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  private storageService = inject(LocalStorageService);

  private readonly user = signal<StoredUser | undefined>(undefined);

  readonly email = computed(() => this.user()?.email);

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    const user = this.storageService.getItem<StoredUser>('user');
    this.user.set(user);
  }
}
