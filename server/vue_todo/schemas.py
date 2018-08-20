from marshmallow import validate
from marshmallow_sqlalchemy import field_for

from . import ma
from .models import TodoList, Todo

not_blank = validate.Length(min=1, error='Field cannot be blank.')


class TodoListSchema(ma.ModelSchema):
    name = field_for(TodoList, 'name', validate=not_blank)

    class Meta:
        model = TodoList


class TodoSchema(ma.ModelSchema):
    title = field_for(TodoList, 'name', validate=not_blank)
    created = field_for(TodoList, 'name', dump_only=True)
    modified = field_for(TodoList, 'name', dump_only=True)

    class Meta:
        model = Todo
        include_fk = True
        exclude = ('todo_list',)

class TodoSearch(ma.ModelSchema):
    title = field_for(TodoList,'name', validate=not_blank)

    class Meta:
        model = Todo

todo_list_schema = TodoListSchema()
todo_lists_schema = TodoListSchema(many=True)
todo_schema = TodoSchema()
todos_schema = TodoSchema(many=True)
todo_search_schema = TodoSearch()