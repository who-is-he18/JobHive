"""added email to jobseeker profile

Revision ID: 76548005fd6c
Revises: 
Create Date: 2024-11-20 12:01:54.806818

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '76548005fd6c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('employerprofiles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('employerprofiles', schema=None) as batch_op:
        batch_op.drop_column('email')

    # ### end Alembic commands ###
