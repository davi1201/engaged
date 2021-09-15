/* eslint-disable class-methods-use-this */
class CharacterService {
  getColumsTable() {
    return [
      {
        name: 'name',
        required: true,
        label: 'Nome',
        align: 'left',
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'species',
        required: true,
        label: 'Espécie',
        align: 'center',
        field: (row) => row.species,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'status',
        required: true,
        label: 'Status',
        align: 'center',
        field: (row) => row.status,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'actions',
        required: true,
        label: 'Ações',
        align: 'center',
      },
    ];
  }
}
const characterService = new CharacterService();
export default characterService;
