"""added unique to name

Revision ID: 4933fd089cc7
Revises: fd2bf15b9aa1
Create Date: 2024-10-30 12:16:02.896972

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4933fd089cc7'
down_revision = 'fd2bf15b9aa1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('playlists', schema=None) as batch_op:
        batch_op.create_unique_constraint(batch_op.f('uq_playlists_name'), ['name'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('playlists', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('uq_playlists_name'), type_='unique')

    # ### end Alembic commands ###
