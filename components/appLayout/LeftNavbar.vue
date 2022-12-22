<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <NuxtLink to="/dashboard" class="brand-link">
            <span class="brand-link brand-text font-weight-light">Quizae</span>
        </NuxtLink>

        <div class="sidebar">
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <li class="nav-item">
                        <NuxtLink to="/dashboard" class="nav-link" active-class="active">
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>
                                Dashboard
                            </p>
                        </NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink to="/questionnaire" class="nav-link" active-class="active">
                            <i class="nav-icon fas fa-question-circle"></i>
                            <p>
                                Questions & Answers
                            </p>
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
</template>
