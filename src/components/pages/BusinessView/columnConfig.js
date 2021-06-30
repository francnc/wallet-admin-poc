import { Link } from 'react-router-dom';
import { redirectToWallet } from '../../../util/walletRedirection';

export const UserColumns = [
  {
    field: 'id',
    headerName: 'id',
    sortable: false,
    flex: 1.5,
  },
  {
    field: 'fullName',
    headerName: 'User name',
    sortable: false,
    flex: 1.5,
  },
  {
    field: 'email',
    headerName: 'email',
    flex: 1,
    sortable: false,
  },
  {
    field: 'userRole',
    headerName: 'Role',
    flex: 1,
    sortable: false,
  },
  {
    field: 'uuid',
    headerName: 'uuid',
    sortable: false,
    flex: 1.5,
  },
  {
    field: 'action',
    headerName: 'Action',
    flex: 1,
    sortable: false,
    renderCell: (user) => (
      <div
        style={{
          lineHeight: 1.5,
        }}
      >
        <Link to={`/users/${user.id}/edit`}>Edit</Link>
      </div>
    ),
  },
];

export const PolicyColumns = [
  {
    field: 'uuid',
    headerName: 'uuid',
    sortable: false,
    flex: 1.5,
  },
  {
    field: 'insuranceTypeName',
    headerName: 'Insurance type',
    sortable: false,
    flex: 1.5,
  },
  {
    field: 'premium',
    headerName: 'Premium',
    sortable: false,
    flex: 1.5,
  },
  {
    field: 'status',
    headerName: 'Status',
    sortable: false,
    flex: 1.5,
  },
  {
    field: 'Wallet',
    headerName: 'Check in Wallet',
    width: 100,
    sortable: false,
    flex: 1,
    disableClickEventBubbling: true,
    renderCell: (params) => (
      <button
        onClick={() => {
          console.log(params);
          redirectToWallet(params.id, `policies/${params.row.uuid}/endorsements/request`);
        }}
      >
        Modify Policy
      </button>
    ),
  },
];

export const QuoteColumns = [
  {
    field: 'uuid',
    headerName: 'uuid',
    sortable: false,
    flex: 1.5,
  },
  {
    field: 'insuranceTypeName',
    headerName: 'Insurance type',
    sortable: false,
    flex: 1.5,
  },
  {
    field: 'premium',
    headerName: 'Premium',
    sortable: false,
    flex: 1.5,
  },
  {
    field: 'status',
    headerName: 'Status',
    sortable: false,
    flex: 1.5,
  },
];
