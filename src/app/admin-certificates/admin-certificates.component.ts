import { Component, OnInit } from '@angular/core';
import { CertificadosService } from '../services/certificate-service/certificate.service';
import { Certificates } from '../models/certificate/certificate.model';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrls: ['./admin-certificates.component.css']
})
export class AdminCertificatesComponent implements OnInit {

  certificateList: Certificates[] = [];
  editMode: boolean = false;
  
  myCertificate: Certificates = {
    titulo: '',
    emisor: '',
    fechaExpedicion: '',
    estado: ''
  };

  constructor(private _certificadosService: CertificadosService) { }

  ngOnInit(): void {
    this.obtenerCertificados();
  }

  obtenerCertificados() {
    this._certificadosService.getCertificados().subscribe((data: any) => {
      this.certificateList = data.map((element: any) => {
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        } as Certificates;
      });
    });
  }

  AgregarCertificado() {
    if (this.myCertificate.titulo === '' || this.myCertificate.emisor === '') {
      alert('Por favor, completa los campos obligatorios.');
      return;
    }

    if (this.editMode && this.myCertificate.id) {
      this._certificadosService.updateCertificado(this.myCertificate.id, this.myCertificate).then(() => {
        this.LimpiarFormulario();
      });
    } else {
      // Lógica para ingresar un nuevo certificado
      this._certificadosService.saveCertificado(this.myCertificate).then(() => {
        console.log('Certificado agregado correctamente');
        this.LimpiarFormulario();
      }).catch(error => console.error(error));
    }
  }

  seleccionarCert(cert: Certificates) {
    this.editMode = true;
    this.myCertificate = { ...cert };
  }

  deleteCertificate(id: any) {
    if (id && confirm('¿Estás seguro de eliminar este certificado?')) {
      this._certificadosService.deleteCertificado(id).then(() => {
        console.log('Eliminado');
      });
    }
  }

  LimpiarFormulario() {
    this.editMode = false;
    this.myCertificate = {
      titulo: '',
      emisor: '',
      fechaExpedicion: '',
      estado: ''
    };
  }
}
