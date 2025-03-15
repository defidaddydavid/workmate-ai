from app.db.base_class import Base
from app.models.user import User
from app.models.meeting import Meeting, Task

# This file is needed for alembic and init_db
# It imports all models so that Base has them registered
