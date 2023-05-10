import { Component } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pedido-fazerpedido',
  templateUrl: './pedido-fazerpedido.component.html',
  styleUrls: ['./pedido-fazerpedido.component.scss'],
})
export class PedidoFazerpedidoComponent {
  requestName: string = '';
  requestMethod: string = '';
  defaultRequestName: string = '';
  defaultRequestMethod: string = '';

  constructor(
    private pedidosService: PedidosService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.requestName && this.requestMethod) {
      this.pedidosService
        .postPedidos(this.requestName, this.requestMethod)
        .subscribe(
          (response) => {
            console.log(response);
            this.snackBar.open('Pedido criado com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.requestName = this.defaultRequestName;
            this.requestMethod = this.defaultRequestMethod;
          },
          (error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(error.config);
            this.snackBar.open('Ocorreu um erro ao criar o pedido.', 'Fechar', {
              duration: 3000,
            });
          }
        );
    }
  }

  onFocus(event: Event) {
    console.log('Input field focused');
  }

  onBlur(event: Event) {
    console.log('Input field blurred');
  }
}
