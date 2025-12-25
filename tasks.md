# Tasks: Retrieve Students by Department

**Input**: Design documents from `specs/main/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Test tasks are included as requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Paths shown below assume single project structure as outlined in plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Basic foundational setup specific to this feature.

- [ ] T001 Update `package.json` to include any new development dependencies for validation or rate limiting (if required by chosen libraries).
- [ ] T002 Add configuration for logging/metrics emission for API endpoints in `src/config/`. (Based on Clarification: Request count, latency, error rates, and detailed error logs)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and cross-cutting concerns that MUST be complete before the user story can be implemented.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T003 Implement authentication middleware in `src/middlewares/auth.middleware.ts` to restrict access to administrators only. (Based on Clarification: Only administrators can access this endpoint)
- [ ] T004 Implement rate limiting middleware in `src/middlewares/rateLimit.middleware.ts` (e.g., 100 requests/minute per IP). (Based on Clarification: Yes, apply a standard rate limit)
- [ ] T005 Refine existing error handling to ensure consistent 400/404 responses as per spec in `src/utils/response.utils.ts` and global error handling middleware.
- [ ] T006 Ensure Mongoose `Student` model (`src/models/students/Student.model.ts`) has an index on the `department` field for query performance, given max 1,000 students per department.

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Retrieve Students by Department (Admin Only) 🎯 MVP

**Goal**: An administrator can successfully retrieve a list of students for a given department via a new API endpoint.

**Independent Test**: An authorized admin user can successfully make a GET request to `/api/v1/students/department/{departmentName}` and receive a list of students or an appropriate error (e.g., 404 for no students, 400 for invalid department name). The response should adhere to the specified JSON format and meet the P95 latency target <= 500ms.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T007 [P] [US1] Create unit test for `getStudentsByDepartment` service logic in `tests/unit/services/students.service.test.ts`.
- [ ] T008 [P] [US1] Create unit test for `getStudentsByDepartment` controller logic (input validation, service call) in `tests/unit/controllers/students.controller.test.ts`.
- [ ] T009 [P] [US1] Create integration test for `GET /api/v1/students/department/:departmentName` covering success, 404 (no students), 400 (invalid department name), and 401/403 (unauthorized access) scenarios in `tests/integration/students.integration.test.ts`.

### Implementation for User Story 1

- [ ] T010 [US1] Add/update validation schema for `departmentName` parameter in `src/validation/schemas/student.schema.ts` to ensure it's a non-empty string.
- [ ] T011 [US1] Implement `getStudentsByDepartment` method in `src/services/students.service.ts` to query `Student.model.ts` by department.
- [ ] T012 [US1] Implement `getStudentsByDepartment` controller method in `src/controllers/students.controller.ts`, utilizing the service method and handling response formatting.
- [ ] T013 [US1] Define new GET route `/api/v1/students/department/:departmentName` in `src/routes/students.routes.ts`, applying authentication and rate limiting middlewares, and linking to the controller method.
- [ ] T014 [US1] Implement logging and metrics emission within the controller for request count, latency, and error rates for this endpoint.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories or overall project quality.

- [ ] T015 Generate/update OpenAPI (Swagger) documentation to include the new endpoint `/api/v1/students/department/{departmentName}` from `specs/main/contracts/students-by-department.yaml`.
- [ ] T016 Review and refactor code for adherence to best practices and maintainability.
- [ ] T017 Validate the quickstart guide (`specs/main/quickstart.md`) against the implemented endpoint.
- [ ] T018 Confirm the endpoint meets the P95 response time <= 500ms performance target through load testing or profiling.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS User Story 1.
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion.
- **Polish (Final Phase)**: Depends on User Story 1 being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories.

### Within Each User Story

- Tests MUST be written and FAIL before implementation.
- Validation schema before service.
- Service before controller.
- Controller before route.
- Core implementation before logging/metrics.

### Parallel Opportunities

- T001 and T002 can run in parallel.
- T003, T004, T005, T006 can run in parallel (within Phase 2).
- T007, T008, T009 (tests) can run in parallel.
- Once tests are failing, T010, T011, T012, T013, T014 (implementation) can be worked on concurrently if dependencies are managed.
- T015, T016, T017, T018 (Polish phase) can run in parallel.

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
- [ ] T007 [P] [US1] Create unit test for `getStudentsByDepartment` service logic in `tests/unit/services/students.service.test.ts`.
- [ ] T008 [P] [US1] Create unit test for `getStudentsByDepartment` controller logic (input validation, service call) in `tests/unit/controllers/students.controller.test.ts`.
- [ ] T009 [P] [US1] Create integration test for `GET /api/v1/students/department/:departmentName` covering success, 404 (no students), 400 (invalid department name), and 401/403 (unauthorized access) scenarios in `tests/integration/students.integration.test.ts`.

# Implement in parallel (after tests fail and managing dependencies):
- [ ] T010 [US1] Add/update validation schema for `departmentName` parameter in `src/validation/schemas/student.schema.ts` to ensure it's a non-empty string.
- [ ] T011 [US1] Implement `getStudentsByDepartment` method in `src/services/students.service.ts` to query `Student.model.ts` by department.
- [ ] T012 [US1] Implement `getStudentsByDepartment` controller method in `src/controllers/students.controller.ts`, utilizing the service method and handling response formatting.
- [ ] T013 [US1] Define new GET route `/api/v1/students/department/:departmentName` in `src/routes/students.routes.ts`, applying authentication and rate limiting middlewares, and linking to the controller method.
- [ ] T014 [US1] Implement logging and metrics emission within the controller for request count, latency, and error rates for this endpoint.
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (if any additional stories) → Test independently → Deploy/Demo
4. Add User Story 3 (if any additional stories) → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2 (if applicable)
   - Developer C: User Story 3 (if applicable)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
