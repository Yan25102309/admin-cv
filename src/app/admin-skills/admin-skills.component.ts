import { Component, OnInit } from '@angular/core';
// Rutas corregidas
import { SkillsService } from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skills.model';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.css']
})
export class AdminSkillsComponent implements OnInit {

  skillsList: Skills[] = [];
  editMode: boolean = false;
  subHerramientasTexto: string = '';

  mySkill: Skills = {
    area: '',
    destacado: false,
    nivelPorcentaje: 0,
    nombre: '',
    subHerramientas: []
  };

  constructor(private _skillsService: SkillsService) { }

  ngOnInit(): void {
    this.obtenerSkills();
  }

  obtenerSkills() {
    this._skillsService.getSkills().subscribe((data: any) => {
      this.skillsList = data.map((element: any) => {
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        } as Skills;
      });
    });
  }

  AgregarSkill() {
    this.mySkill.subHerramientas = this.subHerramientasTexto
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '');

    if (this.mySkill.nombre === '' || this.mySkill.area === '') {
      alert('Nombre y Área son obligatorios');
      return;
    }

    if (this.editMode && this.mySkill.id) {
      this._skillsService.updateSkill(this.mySkill.id, this.mySkill).then(() => {
        this.LimpiarFormulario();
      });
    } else {
      this._skillsService.saveSkill(this.mySkill).then(() => {
        this.LimpiarFormulario();
      });
    }
  }

  seleccionarSkill(skill: Skills) {
    this.editMode = true;
    this.mySkill = { ...skill };
    this.subHerramientasTexto = skill.subHerramientas ? skill.subHerramientas.join(', ') : '';
  }

  deleteSkill(id: any) {
    if (id && confirm('¿Eliminar esta habilidad?')) {
      this._skillsService.deleteSkill(id);
    }
  }

  LimpiarFormulario() {
    this.editMode = false;
    this.subHerramientasTexto = '';
    this.mySkill = {
      area: '',
      destacado: false,
      nivelPorcentaje: 0,
      nombre: '',
      subHerramientas: []
    };
  }
}
