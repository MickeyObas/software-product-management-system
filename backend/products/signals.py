from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Product
from boards.models import Board, List

@receiver(post_save, sender=Product)
def create_boards_for_product(sender, instance, created, **kwargs):
    if created:
        board_creator = instance.owner
        
        # Define specific board and list data
        boards_and_lists = [
            {
                'title': 'Start Up Roadmap',
                'description': 'This board serves as a comprehensive guide to launching and scaling a new startup. It outlines key milestones, strategies, and tasks required from the initial idea phase through to market entry and growth. Use this board to track progress, assign responsibilities, and ensure alignment across various teams and departments. Features might include sections for product development, marketing plans, funding strategies, and operational tasks.',
                'lists': [
                    {'title': 'Ideas & Feauture requests', 'order': 1},
                    {'title': 'Planned', 'order': 2},
                    {'title': 'In progress', 'order': 3},
                    {'title': 'Released - September 2024', 'order': 4},
                    {'title': 'Released - October 2024', 'order': 5},
                    {'title': 'Released - November 2024', 'order': 6},
                    {'title': 'Released - December 2024', 'order': 7},
                    {'title': 'Released - January 2025', 'order': 8},
                    {'title': 'Released - February 2025', 'order': 9},
                    {'title': 'Released - March 2025', 'order': 10},
                    {'title': 'Released - April 2025', 'order': 11},
                    {'title': 'Released - May 2025', 'order': 12},
                    {'title': 'Released - June 2025', 'order': 13},
                    {'title': 'Released - July 2025', 'order': 14},
                    {'title': 'Released - August 2025', 'order': 15},
                ]
            },
            {
                'title': '5 Buckets of Product Management',
                'description': 'This board helps product managers track and manage their tasks effectively without hassle. Work items are split into 5 different categories - each category consists of a bucket to which its respective work items are assigned.',
                'lists': [
                    {'title': 'Work In Pipeline', 'order': 1},
                    {'title': 'Work In Progress', 'order': 2},
                    {'title': 'Work Completed', 'order': 3},
                    {'title': 'Track Completed', 'order': 4},
                    {'title': 'Goal Achieved', 'order': 5},
                ]
            },
            {
                'title': 'Alternate Product Roadmap',
                'description': 'This board provides a strategic framework for planning and executing projects or initiatives. It helps visualize key phases, deadlines, and dependencies, enabling teams to align their efforts and stay on track. Use this board to outline goals, set priorities, and monitor progress over time. Ideal for managing complex projects, product development cycles, or organizational transformations, the Roadmapping board ensures clarity and coordination throughout the journey.',
                'lists': [
                    {'title': 'Ideas', 'order': 1},
                    {'title': 'Research and Design', 'order': 2},
                    {'title': 'Estimating', 'order': 3},
                    {'title': 'Sprint Candidates', 'order': 4},
                ]
            },
            {
                'title': 'User Storymapping',
                'description': 'This board is designed for organizing and visualizing user stories and tasks. It helps teams break down projects into manageable parts and prioritize features based on user needs and project goals. Use this board to map out the user journey, align team efforts, and ensure all key aspects of the project are covered.',
                'lists': [
                    {'title': f'User Story [{instance.title}]', 'order': 1},
                    {'title': '---Kanban-->', 'order': 2},
                    {'title': 'Todo', 'order': 3},
                    {'title': 'Doing', 'order': 4},
                    {'title': 'Done', 'order': 5},
                ]
            },
        ]

        # Create boards and associated lists
        for board_data in boards_and_lists:
            # Create the board
            board = Board.objects.create(
                product=instance,
                title=board_data['title'],
                description=board_data['description'],
            )
            board.admins.add(board_creator)
            board.save()

            # Create the lists for this board
            for list_data in board_data['lists']:
                List.objects.create(
                    board=board,
                    title=list_data['title'],
                    order=list_data['order']
                )