"""Add transcription fields

Revision ID: 20250315_add_transcription
Revises: previous_revision
Create Date: 2025-03-15 02:54:37.123456

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '20250315_add_transcription'
down_revision = 'previous_revision'  # Set this to your previous migration
branch_labels = None
depends_on = None

def upgrade():
    # Create TranscriptionTier enum type
    op.execute("CREATE TYPE transcriptiontier AS ENUM ('basic', 'premium', 'enterprise')")
    
    # Add new columns to meetings table
    op.add_column('meetings', sa.Column('transcript_segments', postgresql.JSONB(astext_type=sa.Text()), nullable=True))
    op.add_column('meetings', sa.Column('audio_duration', sa.Float(), nullable=True))
    op.add_column('meetings', sa.Column('language', sa.String(), server_default='en', nullable=True))
    op.add_column('meetings', sa.Column('tier', sa.Enum('basic', 'premium', 'enterprise', name='transcriptiontier'), server_default='basic', nullable=True))
    op.add_column('meetings', sa.Column('key_points', postgresql.JSONB(astext_type=sa.Text()), server_default='[]', nullable=True))
    op.add_column('meetings', sa.Column('decisions', postgresql.JSONB(astext_type=sa.Text()), server_default='[]', nullable=True))
    op.add_column('meetings', sa.Column('risks', postgresql.JSONB(astext_type=sa.Text()), server_default='[]', nullable=True))
    op.add_column('meetings', sa.Column('sentiment', postgresql.JSONB(astext_type=sa.Text()), nullable=True))
    op.add_column('meetings', sa.Column('risk_assessment', sa.Text(), nullable=True))
    op.add_column('meetings', sa.Column('status', sa.String(), server_default='pending', nullable=True))
    op.add_column('meetings', sa.Column('error_message', sa.Text(), nullable=True))
    op.add_column('meetings', sa.Column('processed_at', sa.DateTime(), nullable=True))
    op.add_column('meetings', sa.Column('metadata', postgresql.JSONB(astext_type=sa.Text()), server_default='{}', nullable=True))
    
    # Convert existing JSON columns to JSONB for better performance
    op.alter_column('meetings', 'action_items',
        type_=postgresql.JSONB(astext_type=sa.Text()),
        postgresql_using='action_items::jsonb'
    )
    op.alter_column('meetings', 'analysis',
        type_=postgresql.JSONB(astext_type=sa.Text()),
        postgresql_using='analysis::jsonb'
    )
    
    # Convert task dependencies to JSONB
    op.alter_column('tasks', 'dependencies',
        type_=postgresql.JSONB(astext_type=sa.Text()),
        postgresql_using='dependencies::jsonb'
    )
    
    # Create indexes for improved query performance
    op.create_index(op.f('ix_meetings_status'), 'meetings', ['status'], unique=False)
    op.create_index(op.f('ix_meetings_tier'), 'meetings', ['tier'], unique=False)
    op.create_index(op.f('ix_meetings_processed_at'), 'meetings', ['processed_at'], unique=False)

def downgrade():
    # Drop indexes
    op.drop_index(op.f('ix_meetings_processed_at'), table_name='meetings')
    op.drop_index(op.f('ix_meetings_tier'), table_name='meetings')
    op.drop_index(op.f('ix_meetings_status'), table_name='meetings')
    
    # Convert JSONB columns back to JSON
    op.alter_column('meetings', 'action_items',
        type_=postgresql.JSON(astext_type=sa.Text()),
        postgresql_using='action_items::json'
    )
    op.alter_column('meetings', 'analysis',
        type_=postgresql.JSON(astext_type=sa.Text()),
        postgresql_using='analysis::json'
    )
    op.alter_column('tasks', 'dependencies',
        type_=postgresql.JSON(astext_type=sa.Text()),
        postgresql_using='dependencies::json'
    )
    
    # Drop added columns
    op.drop_column('meetings', 'metadata')
    op.drop_column('meetings', 'processed_at')
    op.drop_column('meetings', 'error_message')
    op.drop_column('meetings', 'status')
    op.drop_column('meetings', 'risk_assessment')
    op.drop_column('meetings', 'sentiment')
    op.drop_column('meetings', 'risks')
    op.drop_column('meetings', 'decisions')
    op.drop_column('meetings', 'key_points')
    op.drop_column('meetings', 'tier')
    op.drop_column('meetings', 'language')
    op.drop_column('meetings', 'audio_duration')
    op.drop_column('meetings', 'transcript_segments')
    
    # Drop TranscriptionTier enum type
    op.execute("DROP TYPE transcriptiontier")
