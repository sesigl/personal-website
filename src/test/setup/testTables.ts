// Re-export commonly used database tables for test cleanup
// This avoids dynamic imports and provides a consistent interface

export { 
  usersTable, 
  newsletterCampaignsTable, 
  emailDeliveriesTable 
} from '../../lib/infrastructure/db/schema';