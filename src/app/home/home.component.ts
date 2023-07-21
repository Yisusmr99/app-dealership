import { Component } from '@angular/core';
import { ContactService } from '../services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  formData = {
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    marca: '',
    mensaje: ''
  };

  text: string = 'Enviar';
  constructor(
    private contactoService: ContactService
  ) {}

  onSubmit() {
    this.text = 'Enviando ...';
    if (!this.isFormValid()) {
      this.text = 'Enviar';
      Swal.fire('Warning', 'Please complete all fields.', 'warning');
      return;
    }
    this.contactoService.enviarDatos(this.formData).subscribe(
      response => {
        this.text = 'Enviar';
        Swal.fire('Success', response.message, 'success');
        this.resetForm();
      },
      error => {
        this.text = 'Enviar';
        Swal.fire('Error', error, 'error');
      }
    );
  }

  isFormValid(): boolean {
    return (
      this.formData.nombres.trim() !== '' &&
      this.formData.apellidos.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.telefono.trim() !== '' &&
      this.formData.marca.trim() !== '' &&
      this.formData.mensaje.trim() !== ''
    );
  }

  resetForm(): void {
    this.formData = {
      nombres: '',
      apellidos: '',
      email: '',
      telefono: '',
      marca: '',
      mensaje: ''
    };
  }
}
